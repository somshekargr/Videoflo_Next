import React, { useState, useEffect, useRef } from "react";
import MpStyle from "./media-permissions.module.css";
import { Button, Card, CardContent } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Divider, Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import PermCameraMicIcon from "@mui/icons-material/PermCameraMic";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { useDispatch } from "react-redux";
import DeviceList from "./device-list/device-list";
import { Container } from "@mui/system";
import { useSelector } from "react-redux";
import { WorkflowEvents } from "../../../constants/workflowEvents";
import { CHANGE_PCC_STATUS } from "../../../store/actions/pcc-action";
export default function MediaPermission(props) {
  const websocket = useSelector((state) => state.websocket);
  const videoRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    askAudioPermission();
  }, []);

  const permissionObj = {
    locationPermissionTimestamp: new Date().toISOString(),
    microphonePermissionTimestamp: new Date().toISOString(),
    cameraPermissionTimestamp: new Date().toISOString(),
    rearCameraPermissionTimestamp: new Date().toISOString(),
  };

  const onConsentClick = () => {
    websocket.emit(WorkflowEvents.onPermissionsAcquired, permissionObj);
    if (props.data.role == "agent") {
      websocket.emit(WorkflowEvents.onPrecallChecksCompleted, {});
      dispatch({ type: CHANGE_PCC_STATUS, payload: true });
    } else {
      dispatch({ type: "NEXT_CONSENT" });
    }
  };

  const [btnFunction, setbtnFunction] = useState(false);
  const [audioError, setaudioError] = useState();
  const [camError, setcamError] = useState();
  const [displayVideoCheck, setdisplayVideoCheck] = useState(false);
  const [displayMIcon, setDisplayMIcon] = useState(false);
  const [displayCIcon, setDisplayCIcon] = useState(false);
  const [mtext, setmtext] = useState("Please give access to microphone");
  const [ctext, setctext] = useState("Please give access to your camera.");
  const [audioList, setaudioList] = useState();
  const [cameraList, setCamList] = useState();

  const [title, setTitle] = useState();
  const [subTitle, setsubTitle] = useState();
  const [geolocation, setgeolocation] = useState();
  const [ipAddress, setipAddress] = useState();
  const [microphoneNotFoundText, setmicrophoneNotFoundText] = useState();
  const [cameraNotFoundText, setcameraNotFoundText] = useState();
  const [rearCamera, setrearCamera] = useState();
  const [rearCameraNotFoundText, setrearCameraNotFoundText] = useState();
  const [isRearCameraMandatory, setisRearCameraMandatory] = useState();

  useEffect(() => {
    setTitle(props.data.data.title);
    setsubTitle(props.data.data.subTitle);
  }, []);

  const askAudioPermission = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        const getaudioList = stream.getAudioTracks();
        setaudioList(getaudioList);
        setmtext("Microphone");
        setDisplayMIcon(true);
        setdisplayVideoCheck(true);
        askVideoPermission();
      })
      .catch((err) => {
        // console.log(`${err.name} : ${err.message}`);
        setaudioError(`${err.name} : ${err.message}`);
      });
  };

  const askVideoPermission = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { min: 1280 },
          height: { min: 720 },
        },
      })
      .then((stream) => {
        const getcamList = stream.getVideoTracks();
        setCamList(getcamList);
        setctext("Camera");
        setDisplayCIcon(true);
        setbtnFunction(true);
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        setcamError(`${err.name} : ${err.message}`);
      });
  };
  
  return (
    <>
      <Box className={MpStyle.boxStyle}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" className={MpStyle.smallText}>
              {subTitle}
            </Typography>
            <br />
            <Stack spacing={2} direction="row">
              {!displayMIcon && (
                <CircularProgress size="1.5rem" color="inherit" />
              )}
              {displayMIcon && <PermCameraMicIcon></PermCameraMicIcon>}
              <Typography variant="body1">{mtext}</Typography>
            </Stack>
            {audioError && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{audioError}</Alert>
              </Stack>
            )}
            {audioList && (
              <>
                <br />
                <DeviceList
                  label="Available Microphones"
                  list={audioList}
                ></DeviceList>
                <br />
                <br />
                <Typography variant="body2" className={MpStyle.warnmsg}>
                  Please make sure you are able to hear yourself when you speak
                </Typography>
              </>
            )}
            <br />
            <Divider />
            <br />
            {displayVideoCheck && (
              <>
                <Stack spacing={2} direction="row">
                  {displayCIcon && (
                    <VideoCameraFrontIcon></VideoCameraFrontIcon>
                  )}
                  {!displayCIcon && (
                    <CircularProgress size="1.5rem" color="inherit" />
                  )}
                  <Typography variant="body1">{ctext}</Typography>
                </Stack>
                {camError && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{camError}</Alert>
                  </Stack>
                )}
                <br />
                {cameraList && (
                  <>
                    <DeviceList
                      label="Available Cameras"
                      list={cameraList}
                    ></DeviceList>
                    <br />
                    <br />
                    <Typography variant="body2" className={MpStyle.warnmsg}>
                      Please make sure you are able to see the video below
                    </Typography>
                    <Container>
                      <video ref={videoRef} autoPlay />
                    </Container>
                  </>
                )}

                <Divider />
              </>
            )}

            <Button
              disabled={!btnFunction}
              className={btnFunction ? MpStyle.ebtnStyle : MpStyle.dbtnStyle}
              variant="body2"
              onClick={onConsentClick}
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

import React, { useState, useEffect, useRef } from "react";
import MpStyle from "./media-permissions.module.css";
import { Card, CardContent, Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import PermCameraMicIcon from "@mui/icons-material/PermCameraMic";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { WorkflowEvents } from "../../../constants/workflowEvents";
import { CHANGE_PCC_STATUS } from "../../../store/actions/pcc-action";

import ErrorIcon from "@mui/icons-material/Error";

const permissionObj = {
  locationPermissionTimestamp: new Date().toISOString(),
  microphonePermissionTimestamp: new Date().toISOString(),
  cameraPermissionTimestamp: new Date().toISOString(),
  rearCameraPermissionTimestamp: new Date().toISOString(),
};

export default function MediaPermission(props) {
  const websocket = useSelector((state) => state.websocket);
  const pcc = useSelector((state) => state.pcc);
  const dispatch = useDispatch();
  const sessionInfo = useSelector((state) => state.sessionInfo);

  const [isAccquiringAudio, setisAccquiringAudio] = useState(false);
  const [isAccuiringVideo, setisAccuiringVideo] = useState(false);
  const [isAccuiringGeoLocation, setisAccuiringGeoLocation] = useState(false);
  const [isAudioAccquried, setisAudioAccquried] = useState(null);
  const [isVideoAccquired, setisVideoAccquired] = useState(null);
  const [isGeoLocationAccquired, setisGeoLocationAccquired] = useState(true);
// make isGeoLocationAccquired to true and comment line 178 to 179, 183 to 187 and 44
  const onConsentClick = () => {
    console.log(permissionObj);
    websocket.emit(WorkflowEvents.onPermissionsAcquired, permissionObj);

    props.pccActionClicked();
  };

  useEffect(() => {
    // askGeoLocationPermission();
  }, []);

  useEffect(() => {
    if (isGeoLocationAccquired) {
      askAudioPermission();
    }
  }, [isGeoLocationAccquired]);

  useEffect(() => {
    if (isAudioAccquried) {
      askVideoPermission();
    }
  }, [isAudioAccquried]);

  useEffect(() => {
    if (
      isVideoAccquired === true &&
      isAudioAccquried === true &&
      isGeoLocationAccquired === true
    ) {
      onConsentClick();
    }

    // else{
    //   setTimeout(() => {
    //     console.log('Permission called...')
    //     askAudioPermission()
    //     askVideoPermission()
    //   }, 1000);
    // }
  }, [isVideoAccquired]);

  const askAudioPermission = () => {
    setisAccquiringAudio(true);
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        setisAudioAccquried(true);
        console.log("AUDIO GRANTED");
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((err) => {
        console.log("AUDIO DENIED");
        setisAudioAccquried(false);
      })
      .finally(() => {
        setisAccquiringAudio(false);
      });
  };

  const askVideoPermission = () => {
    setisAccuiringVideo(true);
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        console.log("VIDEO GRANTED");
        setisVideoAccquired(true);
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((err) => {
        console.log("VIDEO DENIED");
        setisVideoAccquired(false);
      })
      .finally(() => {
        setisAccuiringVideo(false);
      });
  };

  const revealPosition = () => {
    setisGeoLocationAccquired(true);
  };
  const positionDenied = () => {
    setisGeoLocationAccquired(false);
    setisAccuiringGeoLocation(false);
  };
  const geoSettings = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const askGeoLocationPermission = () => {
    setisAccuiringGeoLocation(true);
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "granted") {
            setisGeoLocationAccquired(true);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              revealPosition,
              positionDenied,
              geoSettings
            );
          } else if (result.state === "denied") {
            setisGeoLocationAccquired(false);
          }
        })
        .catch((err) => {
          setisGeoLocationAccquired(false);
        })
        .finally((err) => {
          setisAccuiringGeoLocation(false);
        });
    } else {
      alert("GeoLocation Not available!");
      setisGeoLocationAccquired(false);
      setisAccuiringGeoLocation(false);
    }
  };

  return (
    <>
      <Box className={MpStyle.boxStyle}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              Permission Required
            </Typography>
            <Typography variant="body2" className={MpStyle.smallText}>
              Videoflo needs to access your location, camera and audio devices
            </Typography>
            <br />
            <Stack spacing={2} direction="row">
              {isAccuiringGeoLocation && (
                <CircularProgress size="1.5rem" color="inherit" />
              )}
              {/* {isGeoLocationAccquired == true && (
                <LocationOnIcon></LocationOnIcon>
              )} */}
              {isGeoLocationAccquired == false && (
                <ErrorIcon color="red"></ErrorIcon>
              )}
              {/* <Typography variant="body1">
                {isGeoLocationAccquired === false &&
                  "Opps! Please Allow Location Access and refresh"}
                {isGeoLocationAccquired === true && "Success"}
              </Typography> */}
            </Stack>

            <Stack spacing={2} direction="row">
              {isAccquiringAudio && (
                <CircularProgress size="1.5rem" color="inherit" />
              )}
              {isAudioAccquried == true && (
                <PermCameraMicIcon></PermCameraMicIcon>
              )}
              {isAudioAccquried == false && <ErrorIcon color="red"></ErrorIcon>}
              <Typography variant="body1">
                {isAudioAccquried === false &&
                  "Opps! Please Allow Audio Access and refresh"}
                {isAudioAccquried === true && "Success"}
              </Typography>
            </Stack>

            <Stack spacing={2} direction="row">
              {isAccuiringVideo && (
                <CircularProgress size="1.5rem" color="inherit" />
              )}
              {isVideoAccquired == true && (
                <VideoCameraFrontIcon></VideoCameraFrontIcon>
              )}
              {isVideoAccquired == false && <ErrorIcon color="red"></ErrorIcon>}
              <Typography variant="body1">
                {isVideoAccquired === false &&
                  "Opps! Please Allow Camera Access and refresh"}
                {isVideoAccquired === true && "Success"}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

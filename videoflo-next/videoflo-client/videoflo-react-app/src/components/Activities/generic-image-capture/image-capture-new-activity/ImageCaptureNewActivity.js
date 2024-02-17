import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import IcnaStyles from "./ImageCaptureNewActivity.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { WorkflowEvents } from "../../../../constants/workflowEvents";
import { LocalUserService } from "../../../../services/localUser.service";
import BlockUI from "../../../BlockUI/BlockUI";
import CircularProgress from "@mui/material/CircularProgress";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const modelStyle = {
  left: "50%",
  top: "50%",
  width: "auto",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "3%",
  height: "auto",
};

function ImageCaptureNewActivity(props) {
  const sessionInfo = useSelector((state) => state.sessionInfo);
  const websocket = useSelector((state) => state.websocket);

  const [isWaiting, setIsWaiting] = useState(false);
  const [open, setOpen] = useState(false);
  const [activityData, setActicityData] = useState();
  const [base64ImageOfLocalUser, setbase64ImageOfLocalUser] = useState();
  const [isDataAvailable, setisDataAvailable] = useState(false);
  const [blockUI, setblockUI] = useState(false);
  const dataFetchedRef = useRef(false);
  const captureDataRef = useRef(false);
  const onCaptureImageRes = useRef(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getImageFromLocalStream = (localuser) => {
    const video = localuser.getStreamManager()?.videos[0].video;
    if (video) {
      const canvas = document.createElement("canvas");
      // scale the canvas accordingly
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // grab the frame from the video element and draw it on the canvas
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);

      const base64Image = canvas.toDataURL("image/jpeg");

      return base64Image;
    }
  };
  //Names to be change
  const isClient = () => {
    return props?.activityData?.activity?.gatherFrom?.includes(
      sessionInfo.role
    );
  };

  //Names to be change
  const isAgent = () => {
    return props?.activityData?.activity?.displayTo?.includes(sessionInfo.role);
  };
  const initializeEventHandlers = () => {
    websocket.on(
      WorkflowEvents.onCaptureImageResponse,
      async (captureImageResponse) => {
        if (onCaptureImageRes.current) {
          setbase64ImageOfLocalUser(captureImageResponse.responseData.image);
          onCaptureImageRes.current = false;
          setIsWaiting(false);
        }
      }
    );
    websocket.on(
      WorkflowEvents.onCaptureImageRequest,
      async (captureImageRequest) => {
        if (captureImageRequest.type == "response") {
          captureDataRef.current = false;
          if (isClient() && !captureDataRef.current) {
            captureDataRef.current = true;
            const localUser = LocalUserService.getLocalUser();
            const base64ImageOfLocalUser = getImageFromLocalStream(localUser);
            websocket.emit(WorkflowEvents.onCaptureImageRequest, {
              type: "responseImage",
              responseData: {
                image: base64ImageOfLocalUser,
              },
            });
          }
        }
      }
    );
    /*listening to onActivityDataAvailable payload as */
    websocket.on(
      WorkflowEvents.onActivityDataAvailable,
      (activityDataAvaiable) => {
        setisDataAvailable(true);
      }
    );
  };

  useEffect(() => {
    setActicityData(props.activityData);
    let timerId = setTimeout(() => {
      initializeEventHandlers();
    }, 1000);
    timerId = null;
    // cleanup
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const onCapture = () => {
    setbase64ImageOfLocalUser();
    setIsWaiting(true);
    setisDataAvailable(false);

    dataFetchedRef.current = false;
    onCaptureImageRes.current = true;
    websocket.emit(WorkflowEvents.onCaptureImageRequest, {
      type: "request",
      requestData: {},
    });
  };

  useEffect(async () => {
    if (dataFetchedRef.current) return;
    if (base64ImageOfLocalUser && isAgent()) {
      dataFetchedRef.current = true;
      setIsWaiting(false);
      websocket.emit(WorkflowEvents.onActivityDataGathered, {
        activityId: activityData?.activity?.id,
        activityData: {
          gatheredFrom: Object.keys(activityData?.data)[0],
          payload: {
            base64Image: base64ImageOfLocalUser,
          },
        },
      });
    }
  }, [base64ImageOfLocalUser]);

  const onActivityAction = (accepted) => {
    setblockUI(true);

    websocket.emit(WorkflowEvents.onActivityAction, {
      activityData: {
        payload: {
          base64Image: base64ImageOfLocalUser,
          caption: activityData?.activity?.configuration?.options?.caption,
        },
        gatheredFrom: Object.keys(activityData?.data)[0],
        accepted: accepted,
        acceptedBy: sessionInfo.participantId,
      },
    });
  };

  return (
    <>
      {activityData?.activity ? (
        <Grid container>
          <Grid item sx={{ width: "100%" }}>
            <Box>
              <Paper elevation={3}>
                <Card>
                  <CardContent className={IcnaStyles.panHeader}>
                    <Typography variant="h6" component="div">
                      {activityData?.activity?.configuration?.title}
                    </Typography>
                  </CardContent>

                  {/* This renders UI for Admin side */}
                  {isAgent() && (
                    <>
                      <CardContent
                        className={IcnaStyles.panActionContent}
                        sx={{ pb: 0 }}
                      >
                        {isWaiting && (
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        )}
                        {activityData?.activity?.configuration?.description && (
                          <Typography variant="body2" my={1}>
                            {activityData?.activity?.configuration?.description}
                          </Typography>
                        )}
                        {activityData?.activity?.configuration?.checklist && (
                          <FormGroup>
                            {activityData?.activity?.configuration?.checklist.map(
                              (item, index) => (
                                <FormControlLabel
                                  control={<Checkbox my={0} />}
                                  label={item}
                                  key={index}
                                />
                              )
                            )}
                          </FormGroup>
                        )}

                        {base64ImageOfLocalUser && (
                          <>
                            <Typography
                              variant="body2"
                              my={1}
                              sx={{ textAlign: "center" }}
                            >
                              {
                                activityData?.activity?.configuration?.options
                                  ?.caption
                              }
                            </Typography>
                            <div>
                              <img
                                className={IcnaStyles.capturedPanCard}
                                src={base64ImageOfLocalUser}
                                onClick={handleOpen}
                              />
                            </div>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={modelStyle}>
                                {/* <Typography
                                  id="modal-modal-title"
                                  variant="h6"
                                  component="h6"
                                >
                                  {
                                    activityData?.activity?.configuration
                                      ?.options?.caption
                                  }
                                </Typography> */}
                                <Box
                                  component="img"
                                  sx={{
                                    height: "auto",
                                    width: "auto",
                                    maxWidth: "md",
                                  }}
                                  alt={
                                    activityData?.activity?.configuration
                                      ?.options?.caption
                                  }
                                  src={base64ImageOfLocalUser}
                                />
                              </Box>
                            </Modal>
                          </>
                        )}
                        {!isWaiting && (
                          <CardActions direction="row" spacing={1}>
                            <Button
                              variant="contained"
                              className={IcnaStyles.captureBtn}
                              startIcon={<PhotoCamera />}
                              onClick={onCapture}
                            >
                              Capture
                            </Button>
                          </CardActions>
                        )}
                      </CardContent>
                      {
                        <>
                          {isDataAvailable && (
                            <>
                              {blockUI ? (
                                <>
                                  <CardActions
                                    sx={{ justifyContent: "flex-end" }}
                                  >
                                    <Stack p={2}>
                                      <Box>
                                        <CircularProgress />
                                      </Box>
                                    </Stack>
                                  </CardActions>
                                </>
                              ) : (
                                <>
                                  <CardActions
                                    sx={{ justifyContent: "flex-end" }}
                                  >
                                    <Stack
                                      spacing={1}
                                      direction="row"
                                      className={IcnaStyles.combobtns}
                                    >
                                      <Button
                                        variant="contained"
                                        className={IcnaStyles.errorbtn}
                                        onClick={() => onActivityAction(false)}
                                      >
                                        Reject
                                      </Button>
                                      <Button
                                        variant="contained"
                                        className={IcnaStyles.btn}
                                        onClick={() => onActivityAction(true)}
                                      >
                                        Next
                                      </Button>
                                    </Stack>
                                  </CardActions>
                                </>
                              )}
                            </>
                          )}
                        </>
                      }
                    </>
                  )}

                  {/* This renders UI for Client Side */}
                  {isClient() && <></>}
                </Card>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <>Loading Activity..</>
      )}
      <BlockUI blocking={blockUI} />
    </>
  );
}

export default ImageCaptureNewActivity;

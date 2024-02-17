import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import SdStyles from "./SignatureDetection.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { WorkflowEvents } from "../../../../constants/workflowEvents";
import { LocalUserService } from "../../../../services/localUser.service";
import { getDetectedSignature } from "../../../../services/videoflo.service";
import BlockUI from "../../../BlockUI/BlockUI";
import CircularProgress from "@mui/material/CircularProgress";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const modelStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "3%",
  height: "auto",
};
export default function SignatureDetection(props) {
  const sessionInfo = useSelector((state) => state.sessionInfo);
  const websocket = useSelector((state) => state.websocket);

  const [isWaiting, setIsWaiting] = useState(false);
  const [showResult, setShowResult] = useState(null);
  const [open, setOpen] = useState(false);
  const [activityData, setActicityData] = useState();
  const [base64ImageOfLocalUser, setbase64ImageOfLocalUser] = useState();
  const [detectSignatureResponse, setdetectSignatureResponse] = useState();
  const [isDataAvailable, setisDataAvailable] = useState(false);
  const [imageData, setImageData] = useState("data:image/jpeg;base64,");
  const [blockUI, setblockUI] = useState(false);
  const dataFetchedRef = useRef(false);
  const captureDataRef = useRef(false);
  const onCaptureImageRes = useRef(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //gets image from localstream
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

  useEffect(() => {
    setActicityData(props.activityData);
    let timerId;
    timerId = setTimeout(() => {
      initializeEventHandlers();
    }, 1000);
    timerId = null;
    // cleanup
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const initializeEventHandlers = () => {
      websocket.on(
        WorkflowEvents.onCaptureImageResponse,
        async (captureImageResponse) => {
          if (onCaptureImageRes.current) {
            setbase64ImageOfLocalUser(captureImageResponse.responseData.image);
            onCaptureImageRes.current = false;
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

  const onCapture = () => {
    setbase64ImageOfLocalUser();
    setShowResult(null);
    setIsWaiting(true);
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

      let base64String = base64ImageOfLocalUser.replace(
        "data:image/jpeg;base64,",
        ""
      );
      const detectSignatureBody = {
        image: base64String,
      };

      const detectedSignature = await getDetectedSignature(detectSignatureBody);

      setIsWaiting(false);
      websocket.emit(WorkflowEvents.onActivityDataGathered, {
        activityId: activityData?.activity?.id,
        activityData: {
          gatheredFrom: Object.keys(activityData?.data)[0],
          payload: {
            base64Image: `data:image/jpeg;base64,${detectedSignature?.image}`,
          },
        },
      });

      setShowResult(detectedSignature?.success);
      setdetectSignatureResponse(detectedSignature);
    }
  }, [base64ImageOfLocalUser]);

  const onActivityAction = (accepted) => {
    setblockUI(true);

    websocket.emit(WorkflowEvents.onActivityAction, {
      activityData: {
        payload: {
          base64Image: `data:image/jpeg;base64,${detectSignatureResponse?.image}`,
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
                  <CardContent className={SdStyles.panHeader}>
                    <Typography variant="h6" component="div">
                      {activityData?.activity?.configuration?.title}
                    </Typography>
                  </CardContent>

                  {/* This renders UI for Admin side */}
                  {isAgent() && (
                    <>
                      <CardContent
                        className={SdStyles.panActionContent}
                        sx={{ pb: 0 }}
                      >
                        {isWaiting ? (
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        ) : (
                          ""
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
                                className={SdStyles.capturedPanCard}
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
                              className={SdStyles.captureBtn}
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
                          {
                            {
                              null: <></>,
                              true: (
                                <>
                                  <CardContent>
                                    <Typography
                                      variant="body2"
                                      component="h6"
                                      my={1}
                                    >
                                      Croped Signature
                                    </Typography>
                                    <Box
                                      component="img"
                                      sx={{
                                        height: 250,
                                        width: 250,
                                        maxHeight: { xs: 167, md: 400 },
                                        maxWidth: { xs: 250, md: 430 },
                                        borderRadius: 2,
                                      }}
                                      alt="croped_signature"
                                      src={
                                        imageData +
                                        detectSignatureResponse?.image
                                      }
                                    />
                                  </CardContent>
                                </>
                              ),
                              false: (
                                <>
                                  <CardContent>
                                    <Stack sx={{ width: "100%" }} spacing={1}>
                                      <Alert severity="error">
                                        {detectSignatureResponse?.errorMessage}
                                      </Alert>
                                    </Stack>
                                  </CardContent>
                                </>
                              ),
                            }[showResult]
                          }
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
                                      className={SdStyles.combobtns}
                                    >
                                      <Button
                                        variant="contained"
                                        className={SdStyles.errorbtn}
                                        onClick={() => onActivityAction(false)}
                                      >
                                        Reject
                                      </Button>
                                      <Button
                                        variant="contained"
                                        className={SdStyles.btn}
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

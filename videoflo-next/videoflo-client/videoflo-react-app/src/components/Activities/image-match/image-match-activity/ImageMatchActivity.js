import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import PdStyles from "../../pancard/pancard-detection/PancardDetection.module.css";
import ImaStyles from "./ImageMatchActivity.module.css";
import {
  CHANGE_ACTIVITY_STATUS,
  NEXT_ACTIVITY,
} from "../../../../store/actions/activity";
import { LocalUserService } from "../../../../services/localUser.service";
import { WorkflowEvents } from "../../../../constants/workflowEvents";
import {
  compareImage,
  compareImageAQR,
} from "../../../../services/videoflo.service";
import BlockUI from "../../../BlockUI/BlockUI";
import AlertTitle from "@mui/material/AlertTitle";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
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

export default function ImageMatchActivity(props) {
  //Reedux Subscription
  //TODO onActivityDataGathered => onBeginActivty
  //onActivityDataAvailable <=
  const sessionInfo = useSelector((state) => state.sessionInfo);
  const websocket = useSelector((state) => state.websocket);
  const participantData = useSelector((state) => state.participantData);
  const dispatch = useDispatch();

  const [showResult, setShowResult] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [compareImageResponse, setCompareImageResponse] = useState();
  const [activityData, setActicityData] = useState();
  const [base64ImageOfLocalUser, setbase64ImageOfLocalUser] = useState();
  const [isDataAvailable, setisDataAvailable] = useState(false);
  const [openImage1, setOpenImage1] = React.useState(false);
  const [openImage2, setOpenImage2] = React.useState(false);
  const [blockUI, setblockUI] = useState(false);
  const dataFetchedRef = useRef(false);
  const captureDataRef = useRef(false);
  const onCaptureImageRes = useRef(false);
  const handleOpenImage1 = () => setOpenImage1(true);
  const handleCloseImage1 = () => setOpenImage1(false);
  const handleOpenImage2 = () => setOpenImage2(true);
  const handleCloseImage2 = () => setOpenImage2(false);

  const onCapture = () => {
    setbase64ImageOfLocalUser();
    setCompareImageResponse();
    setisDataAvailable(false);
    setShowResult(null);
    setIsWaiting(true);
    dataFetchedRef.current = false;
    captureDataRef.current = false;
    onCaptureImageRes.current = true;
    websocket.emit(WorkflowEvents.onCaptureImageRequest, {
      type: "request",
      requestData: {},
    });
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
        }
      }
    );

    websocket.on(
      WorkflowEvents.onCaptureImageRequest,
      (captureImageRequest) => {
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

    websocket.on(
      WorkflowEvents.onActivityDataAvailable,
      (activityDataAvaiable) => {
        setisDataAvailable(true);
      }
    );
  };

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

  useEffect(async () => {
    if (dataFetchedRef.current) return;

    if (base64ImageOfLocalUser && isAgent()) {
      dataFetchedRef.current = true;
      const compareImageResponseBody = {
        image1: {
          base64Image: activityData?.activity?.configuration["face1"]?.value,
        },
        image2: { base64Image: base64ImageOfLocalUser },
      };

      const response =
        activityData?.activity?.configuration["face1"]?.sourceFlag ===
        "AadharQR"
          ? await compareImageAQR(compareImageResponseBody)
          : await compareImage(compareImageResponseBody);

      if (response?.isAxiosError) {
        console.log("_______ internalServerError_____");
        setIsWaiting(false);
        setCompareImageResponse(response);
        setShowResult("internalServerError");
      } else {
        if (response?.success) {
          setIsWaiting(false);
          setCompareImageResponse(response);
          setShowResult(response?.isMatching ? "match" : "notMatch"); //Need to change
        } else {
          setIsWaiting(false);
          setShowResult("notFound");
          setCompareImageResponse(response);
        }
      }

      //TODO Handle other cases

      websocket.emit(WorkflowEvents.onActivityDataGathered, {
        activityId: activityData?.activity?.id,
        activityData: {
          gatheredFrom: Object.keys(activityData?.data)[0],
          payload: {
            image1: activityData?.activity?.configuration["face1"]?.value,
            image2: base64ImageOfLocalUser,
            faceMatchingResult: response,
          },
        },
      });
    }
  }, [base64ImageOfLocalUser]);

  useEffect(() => {
    setActicityData(props.activityData);
    let timerId;
    timerId = setTimeout(() => {
      initializeEventHandlers();
    }, 1000);
    timerId = null;
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const onActivityAction = (accepted) => {
    setblockUI(true);

    websocket.emit(WorkflowEvents.onActivityAction, {
      activityData: {
        payload: {
          image1: {
            base64Image: activityData?.activity?.configuration["face1"].value,
          },
          image2: {
            base64Image: base64ImageOfLocalUser,
          },
          faceMatchingResult: compareImageResponse,
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
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {activityData?.activity?.configuration?.title}
                    </Typography>
                  </CardContent>
                  <Divider />

                  {/* This renders UI for Admin side */}
                  {isAgent() && (
                    <>
                      {isWaiting && (
                        <Box sx={{ width: "100%" }}>
                          <LinearProgress />
                        </Box>
                      )}
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Item>
                              <Typography
                                variant="body2"
                                my={1}
                                sx={{ textAlign: "center" }}
                              >
                                {
                                  activityData.activity.configuration["face1"]
                                    .caption
                                }
                              </Typography>
                              <img
                                className={ImaStyles.sourceImage}
                                onClick={handleOpenImage1}
                                src={
                                  activityData.activity.configuration["face1"]
                                    .value
                                }
                                alt={
                                  activityData.activity.configuration["face1"]
                                    .caption
                                }
                                width={50}
                                height={50}
                              />
                              <Modal
                                open={openImage1}
                                onClose={handleCloseImage1}
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
                                      activityData.activity.configuration[
                                        "face1"
                                      ].caption
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
                                      activityData.activity.configuration[
                                        "face1"
                                      ].caption
                                    }
                                    src={
                                      activityData.activity.configuration[
                                        "face1"
                                      ].value
                                    }
                                  />
                                </Box>
                              </Modal>
                            </Item>
                          </Grid>
                          {base64ImageOfLocalUser && (
                            <Grid item xs={6}>
                              <Item>
                                <Typography
                                  variant="body2"
                                  my={1}
                                  sx={{ textAlign: "center" }}
                                >
                                  {
                                    activityData.activity.configuration["face2"]
                                      .caption
                                  }
                                </Typography>
                                <img
                                  className={ImaStyles.sourceImage}
                                  onClick={handleOpenImage2}
                                  src={base64ImageOfLocalUser}
                                  alt={
                                    activityData.activity.configuration["face2"]
                                      .caption
                                  }
                                  width={50}
                                  height={50}
                                />
                                <Modal
                                  open={openImage2}
                                  onClose={handleCloseImage2}
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
                                        activityData.activity.configuration[
                                          "face2"
                                        ].caption
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
                                        activityData.activity.configuration[
                                          "face2"
                                        ].caption
                                      }
                                      src={base64ImageOfLocalUser}
                                    />
                                  </Box>
                                </Modal>
                              </Item>
                            </Grid>
                          )}
                        </Grid>

                        {!isWaiting && showResult !== "match" && (
                          <>
                            <CardActions direction="row" spacing={1}>
                              <Button
                                variant="contained"
                                className={ImaStyles.captureBtn}
                                startIcon={<PhotoCamera />}
                                onClick={onCapture}
                              >
                                Capture
                              </Button>
                            </CardActions>
                          </>
                        )}
                      </CardContent>
                      {
                        {
                          match: (
                            <>
                              <CardContent>
                                <Stack sx={{ width: "100%" }} spacing={1}>
                                  <Alert severity="success">
                                    Faces match{" ("}
                                    {compareImageResponse?.matchingPercentage}
                                    {")"}%
                                  </Alert>
                                </Stack>
                              </CardContent>
                            </>
                          ),
                          notMatch: (
                            <CardContent>
                              <Stack sx={{ width: "100%" }} spacing={1}>
                                <Alert severity="error">
                                  Faces do not match
                                </Alert>
                              </Stack>
                            </CardContent>
                          ),
                          notFound: (
                            <CardContent>
                              <Stack sx={{ width: "100%" }} spacing={1}>
                                <Alert severity="error">
                                  {compareImageResponse?.errorMessage}
                                </Alert>
                              </Stack>
                            </CardContent>
                          ),
                          internalServerError: (
                            <CardContent>
                              <Stack sx={{ width: "100%" }} spacing={1}>
                                <Alert severity="error">
                                  <AlertTitle>Unkown Error</AlertTitle>
                                  <div>
                                    {compareImageResponse?.request?.responseURL}
                                  </div>
                                  <div>
                                    {
                                      compareImageResponse?.request
                                        ?.responseText
                                    }
                                  </div>
                                </Alert>
                              </Stack>
                            </CardContent>
                          ),
                        }[showResult]
                      }
                      {isDataAvailable && (
                        <CardActions sx={{ justifyContent: "flex-end" }}>
                          <Stack
                            spacing={1}
                            direction="row"
                            className={PdStyles.combobtns}
                          >
                            <Button
                              variant="contained"
                              className={PdStyles.errorbtn}
                              onClick={() => onActivityAction(false)}
                            >
                              Reject
                            </Button>
                            <Button
                              variant="contained"
                              className={PdStyles.btn}
                              onClick={() => onActivityAction(true)}
                            >
                              Next
                            </Button>
                          </Stack>
                        </CardActions>
                      )}
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

import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import PdStyles from "./PancardDetection.module.css";
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
import { panRecognition } from "../../../../services/videoflo.service";
import BlockUI from "../../../BlockUI/BlockUI";
import { Input, InputLabel } from "@mui/material";
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

export default function PancardDetection(props) {
  const sessionInfo = useSelector((state) => state.sessionInfo);
  const websocket = useSelector((state) => state.websocket);
  const participantData = useSelector((state) => state.participantData);

  const [isWaiting, setIsWaiting] = useState(false);
  const [showResult, setShowResult] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [activityData, setActicityData] = useState();
  const [base64ImageOfLocalUser, setbase64ImageOfLocalUser] = useState("");
  const [panRecognitionResponse, setpanRecognitionResponse] = useState("");
  const [isApiDataAvailable, setIsApiDataAvailable] = useState(false);
  const [isDataAvailable, setisDataAvailable] = useState(false);
  const [imageData, setImageData] = useState("data:image/jpeg;base64,");
  const [blockUI, setblockUI] = useState(false);
  const [panNumber, setPanNumber] = useState(null);
  const [name, setName] = useState(null);
  const [careOfName, setCareOfName] = useState(null);
  const [dob, setDob] = useState(null);
  const [inputReadOnly, setInputReadOnly] = useState(false);
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

  const initializeEventHandlers = () => {
    if (!isClient()) {
      websocket.on(
        WorkflowEvents.onCaptureImageResponse,
        async (captureImageResponse) => {
          if (onCaptureImageRes.current) {
            setbase64ImageOfLocalUser(captureImageResponse.responseData.image);
            onCaptureImageRes.current = false;
          }
        }
      );
    }

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

    /*listening to onActivityDataAvailable payload as 
    {	activityId: "panCapture", 	data: 	{	27468c14a2824484b84829aa4bd80df7: {	payload: {image: {base64Image: 
        "data:image/jpeg;base64,<base64>"}, result: {success: false, errorCode: 1003, errorMessage: "Pan not found"} }	}	}*/
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
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const onCapture = () => {
    setbase64ImageOfLocalUser();
    setShowResult(null);
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
      const panRecognitionRequestBody = {
        fieldsToRetrieve: [
          ...activityData?.activity?.configuration?.requiredFields,
          ...activityData?.activity?.configuration?.optionalFields,
        ],
        image: { base64Image: base64ImageOfLocalUser },
      };

      const panRecognitionResponse = await panRecognition(
        panRecognitionRequestBody
      );

      setIsWaiting(false);
      setPanNumber(panRecognitionResponse?.pan_num);
      setName(panRecognitionResponse?.name);
      setCareOfName(panRecognitionResponse?.father_name);
      setDob(panRecognitionResponse?.dob);
      setIsApiDataAvailable(true);
      setShowResult(panRecognitionResponse?.success ? "match" : "notMatch"); //Need to change
      setpanRecognitionResponse(panRecognitionResponse);
      setInputReadOnly(false);
    }
  }, [base64ImageOfLocalUser]);

  //onclick of verify button onDataGathered method to be called and onActivityDataGathered is emitted with edited pandata
  const onDataGathered = () => {
    setIsApiDataAvailable(false);
    setInputReadOnly(true);
    /*
      emitting onActivityDataGathered event once the response from @panRecognition is ready
      payload : {activityId: "panCapture",	activityData: {	gatheredFrom: "27468c14a2824484b84829aa4bd80df7", payload: 
                  {image: {base64Image: "data:image/jpeg;base64,<base64>"}, result: panRecognitionResponse}}}
      */
    websocket.emit(WorkflowEvents.onActivityDataGathered, {
      activityId: activityData?.activity?.id,
      activityData: {
        gatheredFrom: Object.keys(activityData?.data)[0],
        payload: {
          image: base64ImageOfLocalUser,
          result: {
            dob: dob,
            errorCode: panRecognitionResponse?.errorCode,
            errorMessage: panRecognitionResponse?.errorMessage,
            face_image: panRecognitionResponse?.face_image,
            father_name: careOfName,
            name: name,
            pan_image: panRecognitionResponse?.pan_image,
            pan_num: panNumber,
            signature_image: panRecognitionResponse?.signature_image,
            success: panRecognitionResponse?.success,
          },
        },
      },
    });
  };

  /*on click of next or reject onActivityAction event is emitted with payload
  {	activityData: 	{	payload: 	{	image: "data:image <base64>"	result: {success: true, errorCode: null, errorMessage: null, dob: "~~/~~/~~",…}	},
  	gatheredFrom: "453e5e69439446cdbaf2eb4455f294b2", accepted: true,	gatheredFrom: "453e5e69439446cdbaf2eb4455f294b2"	}	}*/
  const onActivityAction = (accepted) => {
    setblockUI(true);

    websocket.emit(WorkflowEvents.onActivityAction, {
      activityData: {
        payload: {
          image: base64ImageOfLocalUser,
          result: {
            dob: dob,
            errorCode: panRecognitionResponse?.errorCode,
            errorMessage: panRecognitionResponse?.errorMessage,
            face_image: panRecognitionResponse?.face_image,
            father_name: careOfName,
            name: name,
            pan_image: panRecognitionResponse?.pan_image,
            pan_num: panNumber,
            signature_image: panRecognitionResponse?.signature_image,
            success: panRecognitionResponse?.success,
          },
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
                  <CardContent className={PdStyles.panHeader}>
                    <Typography variant="h6" component="div">
                      {activityData?.activity?.configuration?.title}
                    </Typography>
                  </CardContent>

                  {/* This renders UI for Admin side */}
                  {isAgent() && (
                    <>
                      <CardContent
                        className={PdStyles.panActionContent}
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
                                activityData?.activity?.configuration?.image
                                  ?.caption
                              }
                            </Typography>
                            <div>
                              <img
                                className={PdStyles.capturedPanCard}
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
                                    activityData?.activity?.configuration?.image
                                      ?.caption
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
                                    activityData?.activity?.configuration?.image
                                      ?.caption
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
                              className={PdStyles.captureBtn}
                              startIcon={<PhotoCamera />}
                              onClick={onCapture}
                            >
                              Capture
                            </Button>
                          </CardActions>
                        )}
                      </CardContent>
                      {
                        {
                          null: <></>,
                          match: (
                            <>
                              <CardContent sx={{ py: 0 }}>
                                <Box sx={{ width: "100%" }}>
                                  <Grid
                                    container
                                    rowSpacing={1}
                                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                  >
                                    <Grid item xs={6}>
                                      <Item>
                                        <InputLabel htmlFor="PAN" shrink>
                                          PAN
                                        </InputLabel>
                                        <Input
                                          className={PdStyles.inputFontSize}
                                          multiline
                                          maxRows={3}
                                          readOnly={inputReadOnly}
                                          value={panNumber}
                                          onChange={(e) => {
                                            setPanNumber(
                                              e.target.value.toUpperCase()
                                            );
                                          }}
                                        />
                                      </Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Item>
                                        <InputLabel htmlFor="Name" shrink>
                                          Name
                                        </InputLabel>
                                        <Input
                                          className={PdStyles.inputFontSize}
                                          multiline
                                          maxRows={3}
                                          readOnly={inputReadOnly}
                                          value={name}
                                          onChange={(e) => {
                                            setName(
                                              e.target.value.toUpperCase()
                                            );
                                          }}
                                        />
                                      </Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Item>
                                        <InputLabel
                                          htmlFor="Father/Spouse Name"
                                          shrink
                                        >
                                          Father/Spouse Name
                                        </InputLabel>
                                        <Input
                                          className={PdStyles.inputFontSize}
                                          readOnly={inputReadOnly}
                                          multiline
                                          maxRows={3}
                                          value={careOfName}
                                          onChange={(e) => {
                                            setCareOfName(
                                              e.target.value.toUpperCase()
                                            );
                                          }}
                                        />
                                      </Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Item>
                                        <InputLabel htmlFor="DOB" shrink>
                                          DOB
                                        </InputLabel>
                                        <Input
                                          className={PdStyles.inputFontSize}
                                          multiline
                                          maxRows={3}
                                          readOnly={inputReadOnly}
                                          value={dob}
                                          onChange={(e) => {
                                            setDob(
                                              e.target.value.toUpperCase()
                                            );
                                          }}
                                        />
                                      </Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Item>
                                        <img
                                          className={PdStyles.image}
                                          width={"100%"}
                                          src={
                                            imageData +
                                            panRecognitionResponse?.pan_image
                                          }
                                        />
                                      </Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Item>
                                        <div
                                          className={PdStyles.faceImageSection}
                                        >
                                          <img
                                            className={PdStyles.image}
                                            width={"40%"}
                                            src={
                                              imageData +
                                              panRecognitionResponse?.face_image
                                            }
                                          />
                                        </div>
                                        <div
                                          className={PdStyles.faceImageSection}
                                        >
                                          <img
                                            className={PdStyles.image}
                                            width={"25%"}
                                            src={
                                              imageData +
                                              panRecognitionResponse?.signature_image
                                            }
                                          />
                                        </div>
                                      </Item>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </CardContent>
                              {isApiDataAvailable && (
                                <CardActions
                                  sx={{ justifyContent: "flex-end" }}
                                >
                                  <Stack
                                    spacing={1}
                                    direction="row"
                                    className={PdStyles.combobtns}
                                  >
                                    <Button
                                      variant="contained"
                                      className={PdStyles.btn}
                                      onClick={() => onDataGathered()}
                                    >
                                      Verify
                                    </Button>
                                  </Stack>
                                </CardActions>
                              )}
                              {isDataAvailable && (
                                <CardActions
                                  sx={{ justifyContent: "flex-end" }}
                                >
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
                          ),
                          notMatch: (
                            <CardContent>
                              <Stack sx={{ width: "100%" }} spacing={1}>
                                <Alert severity="error">
                                  {panRecognitionResponse?.errorMessage}
                                </Alert>
                              </Stack>
                            </CardContent>
                          ),
                        }[showResult]
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

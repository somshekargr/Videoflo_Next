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
import AfStyles from "./AssistForm.module.css";
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
import { isAgent, isClient } from "../../../../services/util.services";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import axios from "axios";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";

function AssistForm(props) {
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
  const [canPlayAudio, setcanPlayAudio] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");
  const [whichButton, setwhichButton] = useState(true);

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

  const initializeEventHandlers = () => {
    websocket.on(WorkflowEvents.onActivityStateChanged, async (data) => {
      if (isClient(props, sessionInfo) && data?.canPlayAudio) {
        setcanPlayAudio(true);
        setblockUI(true);
        const response = await axios.get(
          "https://demo.botaiml.com/tts/Play_Audio",
          {
            responseType: "blob",
          }
        );
        const audioBlob = new Blob([response.data], { type: "audio/wav" });
        setAudioSrc(URL.createObjectURL(audioBlob));
        setblockUI(false);
      }
    });

    // websocket.on(
    //   WorkflowEvents.onCaptureImageRequest,
    //   async (captureImageRequest) => {
    //     if (captureImageRequest.type == "response") {
    //       captureDataRef.current = false;
    //       if (isClient() && !captureDataRef.current) {
    //         captureDataRef.current = true;
    //         const localUser = LocalUserService.getLocalUser();
    //         const base64ImageOfLocalUser = getImageFromLocalStream(localUser);
    //         websocket.emit(WorkflowEvents.onCaptureImageRequest, {
    //           type: "responseImage",
    //           responseData: {
    //             image: base64ImageOfLocalUser,
    //           },
    //         });
    //       }
    //     }
    //   }
    // );
    /*listening to onActivityDataAvailable payload as */
    websocket.on(
      WorkflowEvents.onActivityDataAvailable,
      (activityDataAvaiable) => {
        setisDataAvailable(true);
      }
    );
  };

  const onOpenForm = () => {
    console.log("OPEN FORM BUTTON CLICKed");
    window.open(activityData?.activity?.configuration?.formUrl, "_blank");
    if (activityData?.activity?.configuration?.includeTTS) {
      setTimeout(() => {
        setwhichButton(false);
      }, 30000);
    }
  };

  const onPlayAudio = () => {
    console.log("on play audio event");
    const payload = {
      canPlayAudio: true,
    };
    websocket.emit(WorkflowEvents.onActivityStateChanged, payload);
  };

  const onActivityAction = (accepted) => {
    setblockUI(true);

    websocket.emit(WorkflowEvents.onActivityAction, {
      activityData: {
        accepted: accepted,
        acceptedBy: sessionInfo.participantId,
        gatheredFrom: Object.keys(activityData?.data)[0],
        payload: {},
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
                    <Typography variant="caption" component="div">
                      {activityData?.activity?.configuration?.description}
                    </Typography>
                  </CardContent>
                  <Divider />

                  {/* This renders UI for Admin side */}
                  {isAgent(props, sessionInfo) && (
                    <>
                      <CardContent
                        className={AfStyles.panActionContent}
                        sx={{ pb: 0 }}
                      >
                        {whichButton ? (
                          <CardActions direction="row" spacing={1}>
                            <Button
                              variant="contained"
                              className={AfStyles.captureBtn}
                              startIcon={<FileOpenIcon />}
                              onClick={onOpenForm}
                            >
                              Open Form
                            </Button>
                          </CardActions>
                        ) : (
                          <CardActions direction="row" spacing={1}>
                            <Button
                              variant="contained"
                              className={AfStyles.captureBtn}
                              startIcon={<PlayLessonIcon />}
                              onClick={onPlayAudio}
                            >
                              Play Audio for Customer
                            </Button> 
                          </CardActions>
                        )}

                        <CardActions sx={{ justifyContent: "flex-end" }}>
                          <Stack
                            spacing={1}
                            direction="row"
                            className={AfStyles.combobtns}
                          >
                            <Button
                              variant="contained"
                              className={AfStyles.errorbtn}
                              onClick={() => onActivityAction(false)}
                            >
                              Reject
                            </Button>
                            <Button
                              variant="contained"
                              className={AfStyles.btn}
                              onClick={() => onActivityAction(true)}
                            >
                              Next
                            </Button>
                          </Stack>
                        </CardActions>
                        {/* {!isWaiting && ( */}

                        {/* )} */}

                        {/* for sending evnt from agent to client */}
                      </CardContent>
                    </>
                  )}

                  {/* This renders UI for Client Side */}
                  {isClient(props, sessionInfo) && (
                    <>
                      {canPlayAudio && (
                        <audio src={audioSrc} controls autoPlay={true} />
                      )}
                    </>
                  )}
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

export default AssistForm;

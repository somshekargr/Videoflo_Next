import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import RqaStyles from "./RandomQnaActivity.module.css";
import {
  CHANGE_ACTIVITY_STATUS,
  NEXT_ACTIVITY,
} from "../../../../store/actions/activity";
import Questions from "../questions/Questions";
import { WorkflowEvents } from "../../../../constants/workflowEvents";
import BlockUI from "../../../BlockUI/BlockUI";

export default function RandomQnaActivity(props) {
  const sessionInfo = useSelector((state) => state.sessionInfo);
  const websocket = useSelector((state) => state.websocket);
  const participantData = useSelector((state) => state.participantData);

  const [activityData, setActicityData] = useState();
  const [randomQnas, setrandomQnas] = useState();
  const [isQnaEnded, setisQnaEnded] = useState();
  const [payload, setpayload] = useState();
  const [isDataAvailable, setisDataAvailable] = useState(false);
  const [blockUI, setblockUI] = useState(false);
  //Names to be change
  const isClient = () => {
    return activityData?.activity?.gatherFrom?.includes(sessionInfo.role);
  };

  //Names to be change
  const isAgent = () => {
    return activityData?.activity?.displayTo?.includes(sessionInfo.role);
  };

  const getMultipleRandom = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const getPayload = (payload) => {
    setisQnaEnded(true);
    payload.forEach((ele) => {
      delete ele.allowedAttempts;
      delete ele.speech;
      ele.isAnswered = true;
    });
    setpayload(payload);
  };

  const initializeEventHandlers = () => {
    /*listening to onActivityDataAvailable payload as 
  {	activityId: "randomQuestions", 		data: 	{	c27bc8f9e1b84f33a6e556d42c130baf: {	payload: [{expectedAnswer: "#67, 7th A Cross, Attur Layout, Bangalore 560064",
  		isAnswerCorrect: true,	isAnswered: true,	question: "Could you please confirm your current address?"},{..}, {...}	]	}	}		}*/
    websocket.on(
      WorkflowEvents.onActivityDataAvailable,
      (activityDataAvaiable) => {
        setisDataAvailable(true);
      }
    );
  };

  useEffect(() => {
    let timerId = null;

    setActicityData(props.activityData);
    timerId = setTimeout(() => {
      initializeEventHandlers();
    }, 1000);

    timerId = null;
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    if (activityData) {
      const randomQnAs = getMultipleRandom(
        activityData?.activity?.configuration?.qnaPairs,
        3
      );
      setrandomQnas(randomQnAs);
    }
  }, [activityData]);

  useEffect(() => {
    if (isQnaEnded) {
      websocket.emit(WorkflowEvents.onActivityDataGathered, {
        activityId: props?.activityData?.activity?.id,
        activityData: {
          gatheredFrom: Object.entries(props?.activityData?.data)[0][0],
          payload: payload,
        },
      });
    }
  }, [isQnaEnded]);

  /*on click of next or reject onActivityAction event is emitted with payload
  {activityData: 	{accepted: @accepted,acceptedBy: "f2ce2a25fcc34932ac4630a215275e4b",gatheredFrom: "c27bc8f9e1b84f33a6e556d42c130baf",
  	payload: [{	expectedAnswer: "#67, 7th A Cross, Attur Layout, Bangalore 560064",	isAnswerCorrect: true,isAnswered: true, question: "Could you please confirm your current address?"},
    {...}, {...}],}			}*/
  const onActivityAction = (accepted) => {
    setblockUI(true);
    websocket.emit(WorkflowEvents.onActivityAction, {
      activityData: {
        payload: payload,
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
                    <Typography variant="caption" component="div">
                      {activityData?.activity?.configuration?.description}
                    </Typography>
                  </CardContent>
                  <Divider />

                  {/* This renders UI for Admin side */}
                  {isAgent() && (
                    <>
                      <CardContent>
                        {randomQnas && (
                          <Questions
                            payload={getPayload}
                            qnas={randomQnas}
                          ></Questions>
                        )}
                      </CardContent>
                      {isDataAvailable && (
                        <>
                          <CardActions sx={{ justifyContent: "flex-end" }}>
                            <Stack
                              spacing={1}
                              direction="row"
                              className={RqaStyles.combobtns}
                            >
                              <Button
                                variant="contained"
                                className={RqaStyles.errorbtn}
                                onClick={() => onActivityAction(false)}
                              >
                                Reject
                              </Button>
                              <Button
                                variant="contained"
                                className={RqaStyles.btn}
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

import React, { useState, useEffect, useRef } from "react";
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
import styles from "./Conditions.module.css";
import {
  CHANGE_ACTIVITY_STATUS,
  NEXT_ACTIVITY,
} from "../../../../store/actions/activity";
// import Questions from "../questions/Questions";
import { WorkflowEvents } from "../../../../constants/workflowEvents";
import BlockUI from "../../../BlockUI/BlockUI";
import CustomerConditionsComponent from "./ConditonsForCustomer";
import AgentConditionsComponent from "./ConditionsForAgent";

export default function ConditionsActivity(props) {
  const sessionInfo = useSelector((state) => state.sessionInfo);
  const websocket = useSelector((state) => state.websocket);
  const participantData = useSelector((state) => state.participantData);
  const childRef = useRef(null);
  const [activityData, setActicityData] = useState();
  const [payload, setpayload] = useState();
  const [isDataAvailable, setisDataAvailable] = useState(false);
  const [blockUI, setblockUI] = useState(false);
  const [conditionsCompleted, setConditionsCompleted] = useState(false);

  const handleConditionsCompleted = () => {
    websocket.emit(WorkflowEvents.onActivityStateChanged, {
      conditionsCompleted: true,
    });
  };
  //Names to be change
  const isClient = () => {
    return activityData?.activity?.gatherFrom?.includes(sessionInfo.role);
  };

  //Names to be change
  const isAgent = () => {
    return activityData?.activity?.displayTo?.includes(sessionInfo.role);
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
    websocket.on(WorkflowEvents.onActivityStateChanged, (data) => {
      if (data.conditionsCompleted) {
        setConditionsCompleted(true);
      }
      if (data.eachCondition) {
        if (childRef.current) {
          childRef.current.handleCheckButtonClick();
        }
      }
    });
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

  const handleEachCondition = () => {
    websocket.emit(WorkflowEvents.onActivityStateChanged, {
      eachCondition: true,
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
                        <AgentConditionsComponent
                          conditions={
                            activityData?.activity?.configuration
                              ?.arrOfConditions
                          }
                          ref={childRef}
                        />
                      </CardContent>

                      {conditionsCompleted && (
                        <>
                          <CardActions sx={{ justifyContent: "flex-end" }}>
                            <Stack
                              spacing={1}
                              direction="row"
                              className={styles.combobtns}
                            >
                              <Button
                                variant="contained"
                                className={styles.errorbtn}
                                onClick={() => onActivityAction(false)}
                              >
                                Reject
                              </Button>
                              <Button
                                variant="contained"
                                className={styles.btn}
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
                  {isClient() && (
                    <>
                      <CardContent>
                        <CustomerConditionsComponent
                          conditions={
                            activityData?.activity?.configuration
                              ?.arrOfConditions
                          }
                          onConditionsCompleted={handleConditionsCompleted}
                          onEachCondition={handleEachCondition}
                        />
                      </CardContent>
                    </>
                  )}
                </Card>
              </Paper>
            </Box>
          </Grid>
          <BlockUI blocking={blockUI} />
        </Grid>
      ) : (
        <>Loading Activity..</>
      )}
    </>
  );
}

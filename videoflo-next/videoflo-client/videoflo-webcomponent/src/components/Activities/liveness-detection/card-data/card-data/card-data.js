import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardButton from "../card-button/card-button";
import LinearProgress from "@mui/material/LinearProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CdStyle from "./card-data.module.css";
import { useSelector } from "react-redux";
import { WorkflowEvents } from "../../../../../constants/workflowEvents";

export default function CardData(props) {
  const sessionInfo = useSelector((state) => state.sessionInfo);
  const websocket = useSelector((state) => state.websocket);
  const [activityData, setActivityData] = useState();
  const [displayProgress, setdisplayProgress] = useState(false);
  const onActivityClick = (accepted) => {
    props.blockUI(true);

    websocket.emit(WorkflowEvents.onActivityAction, {
      activityData: {
        gatheredFrom: Object.keys(activityData?.data)[0],
        accepted: accepted,
        acceptedBy: sessionInfo.participantId,
        payload: props?.stateData?.stateData?.payload?.items,
      },
    });
  };

  useEffect(() => {
    setActivityData(props.activityData);
  }, []);

  const captureRemoteFrames = async (ignorePoseMatch) => {
    await props.captureRemoteFrames(ignorePoseMatch);
    setdisplayProgress(false);
  };

  const getPoseComponentForAgent = () => {
    let poses = [];
    for (
      let i = 0;
      i <= props?.stateData?.stateData?.payload?.curItemIndex;
      i++
    ) {
      const poseData = props.stateData.stateData.payload.items[i];
      poses.push(
        <Grid container>
          {poseData?.result?.response?.results[0] && (
            <Grid item xs={3} sm={1} md={1}>
              {poseData?.progress == 100 ? (
                <CheckCircleIcon></CheckCircleIcon>
              ) : (
                <ErrorIcon color="error" />
              )}
            </Grid>
          )}

          <Grid item xs={3} sm={3} md={2}>
            {poseData?.pose}
          </Grid>
          <Grid item xs={3} sm={3} md={3}>
            {poseData?.error?.response?.results[0]?.errorMessage}
          </Grid>
          <Grid item xs={3} sm={5} md={6}>
            <CardButton
              captureRemoteFrames={captureRemoteFrames}
              poseData={poseData}
              setStateData={props.setStateData}
              activityStateChanged={props.activityStateChanged}
              stateData={props.stateData}
              setdisplayProgress={setdisplayProgress}
              onContinue={props.displaySecond}
              onProceed={props.displayThird}
              last={props.last}
            ></CardButton>
          </Grid>
        </Grid>
      );
    }

    return poses;
  };

  const getPoseComponentForCustomer = () => {
    const poseNamesMapper = {
      faceleft: "Left",
      faceright: "Right",
      faceup: "Up",
      pacedown: "Down",
    };
    let poses = [];
    for (let i = 0; i <= props.stateData.stateData.payload.curItemIndex; i++) {
      if (
        props.stateData.stateData.payload.curItemIndex >=
        props.stateData.stateData.payload.items.length
      ) {
        return;
      }
      const poseData = props.stateData?.stateData?.payload?.items[i];
      poses.push(
        <Grid key={`poseContent_${i}`} container>
          {(poseData?.isCaptureButtonVisible || poseData?.isInProgress) && (
            <p>Please turn face {poseNamesMapper[poseData?.pose]}</p>
          )}
          {poseData?.isCheckingHeadPoses && (
            <>
              <p>Verifying....</p>
            </>
          )}
          {poseData?.progress == 100 && <p>Done</p>}
        </Grid>
      );
    }

    return poses;
  };

  return (
    <>
      {activityData && props.stateData && (
        <>
          {props.isAgent && getPoseComponentForAgent()}
          {!props.isAgent && getPoseComponentForCustomer()}
          {props.isAgent && displayProgress && (
            <Grid container>
              <Box sx={{ width: "100%", margin: "10px" }}>
                <LinearProgress />
              </Box>
            </Grid>
          )}
          {props.isAgent && (
            <>
              <Divider></Divider>
              <br />
              <br />
              {props?.stateData?.stateData?.payload?.allPoseCompleted &&
                props?.isDataAvailable && (
                  <>
                    <Stack
                      spacing={1}
                      direction="row"
                      className={CdStyle.combobtns}
                    >
                      <Button
                        variant="contained"
                        className={CdStyle.errorbtn}
                        onClick={() => onActivityClick(false)}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="contained"
                        className={CdStyle.btn}
                        onClick={() => onActivityClick(true)}
                      >
                        Next
                      </Button>
                    </Stack>
                    <br />
                  </>
                )}
            </>
          )}
        </>
      )}
    </>
  );
}

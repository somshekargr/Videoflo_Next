import React from "react";
import Button from "@mui/material/Button";
import CbStyle from "../card-button/card-button.module.css";
import Stack from "@mui/material/Stack";

export default function CardButton(props) {
  const onRetryButtonClick = () => {
    props.setStateData();
  };

  const onStartCapture = (ignorePoseMatch = false) => {
    props.setdisplayProgress(true);
    let currentState = { ...props.stateData };
    let ongoingPoseData =
      currentState.stateData.payload.items[
        currentState.stateData.payload.curItemIndex
      ];
    ongoingPoseData.isCaptureButtonVisible = false;
    currentState.stateData.payload.items[
      currentState.stateData.payload.curItemIndex
    ] = ongoingPoseData;
    props.setStateData(currentState);
    props.activityStateChanged(currentState);
    props.captureRemoteFrames(ignorePoseMatch);

    //CApture from remote stream
  };

  return (
    <>
      {props.poseData.isCaptureButtonVisible && (
        <Button
          variant="contained"
          className={CbStyle.startbtn}
          onClick={() => onStartCapture()}
        >
          Start
        </Button>
      )}

      {!props.poseData?.isCaptureButtonVisible &&
        props.poseData?.isInProgress &&
        props.poseData?.progress == 0 && (
          <Stack spacing={1} direction="row" className={CbStyle.btnalign}>
            <Button
              variant="contained"
              className={CbStyle.errorbtn}
              onClick={() => onStartCapture()}
            >
              Retry
            </Button>
            <Button
              variant="contained"
              className={CbStyle.btn}
              onClick={() => {
                onStartCapture(true);
              }}
            >
              Continue
            </Button>
          </Stack>
        )}
    </>
  );
}

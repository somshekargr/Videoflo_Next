import React, { useState } from "react";
import containerStyles from "./VideoFloContainer.module.css";
import Grid from "@mui/material/Grid";
import VideoRoomComponent from "../video-room/VideoRoomComponent";
import DisplayResult from "../result/result";
import ActivityContainer from "../Activities/container/ActivityContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { WorkflowEvents } from "../../constants/workflowEvents";
import { VIDEO_SESSION_JOIN_INFO } from "../../store/actions/videoSessionInfo";
import ModalData from "../Activities/model-data/model-data";
import { INITILIZE_ACTIVITY } from "../../store/actions/currentActivtyData";

export default function VideoFloContainer(props) {
  const videoSessioJoinInfo = useSelector((state) => state.videoSessioJoinInfo);
  const activity = useSelector((state) => state.activity);
  const websocket = useSelector((state) => state.websocket);
  const [hasPendingPcc, sethasPendingPcc] = useState(true);
  const [isQuaromFulfilled, setisQuaromFulfilled] = useState(false);
  const [currentActivity, setcurrentActivity] = useState(undefined);
  const [isActivitiesExhausted, setisActivitiesExhausted] = useState(false);
  const [resultData, setresultData] = useState();
  const [remoteUsers, setremoteUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    websocket.on(WorkflowEvents.onPrecallChecksCompleted, (data) => {
      sethasPendingPcc(data.hasPendingPrecallChecks);
      if (data.hasPendingPrecallChecks === false) {
        websocket.emit(WorkflowEvents.initializeParticipantVideoSession, {});
        websocket.once(
          WorkflowEvents.initializeParticipantVideoSession,
          (data) => {
            //TODO videoSessionJoinInfo property to be added in redex
            console.warn("initializeParticipantVideoSession", data);
            dispatch({ type: VIDEO_SESSION_JOIN_INFO, payload: data });
            websocket.emit(WorkflowEvents.initializeActivities, {});
          }
        );
      }
    });

    websocket.on(WorkflowEvents.onQuorumUpdate, (data) => {
      console.warn("onQuorumUpdate: ", data);
      // setquaramStatus(data.hasQuorum);
      setisQuaromFulfilled(data.hasQuorum);
    });

    websocket.on(WorkflowEvents.onBeginActivity, (activityData) => {
      setcurrentActivity(activityData);
      //storing currentActivityDate into redux, for configuring OV components based on activity configuration
      dispatch({ type: INITILIZE_ACTIVITY, payload: activityData });
    });

    websocket.on(WorkflowEvents.onActivitiesExhausted, (data) => {
      setisActivitiesExhausted(true);
      console.warn(data);
      setresultData(data);
    });
  }, []);
  
  const remoteUserUpdated = (updatedRemoteUsers) => {
    //Shallow copy dose not woks for state objects
    setremoteUsers([...updatedRemoteUsers]);
  };

  return (
    <>
      <Grid container spacing={2}>
        {
          !hasPendingPcc && isQuaromFulfilled && currentActivity ? (
            <>
              {videoSessioJoinInfo?.webcamToken && (
                <Grid className={containerStyles.ovContainer} item>
                  <VideoRoomComponent
                    className={containerStyles.test}
                    remoteUserUpdated={remoteUserUpdated}
                    sessionInfo={props.sessionInfo}
                    videoSessioJoinInfo={videoSessioJoinInfo}
                    leaveSession={props.leaveSession}
                    error={props.error}
                  ></VideoRoomComponent>
                </Grid>
              )}

              {/* {remoteUsers.length > 0 ? ( */}

              <Grid className={containerStyles.activityContainer} item>
                {isActivitiesExhausted ? (
                  <DisplayResult
                    leaveSession={props.leaveSession}
                    result={resultData}
                  ></DisplayResult>
                ) : (
                  <>
                    <ActivityContainer
                      remoteUsers={remoteUsers}
                      activityData={currentActivity}
                      error={props.error}
                    />
                  </>
                )}
              </Grid>

              {/* ) : ( */}
              {/* <ModalData description="Just a seccond..! Starting Video Session." /> */}
              {/* )} */}
            </>
          ) : (
            <ModalData />
          )
          //
        }
      </Grid>
    </>
  );
}

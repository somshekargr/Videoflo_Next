import React, { useEffect, useState } from "react";
import VideoFloContainer from "./components/videoflo-container/VideoFloContainer";
import { useDispatch, useSelector } from "react-redux";
import { INITIALISE_PCC } from "./store/actions/pcc-action";
import { INITIALISE_ACTIVITIES } from "./store/actions/activity";
import PccContainer from "./components/pcc/container/pcc-container";
import socketIOClient from "socket.io-client";
import { getWsToken } from "./services/videoflo.service";
import { INITIALISE_WEBSOCKET } from "./store/actions/websocket";
import { INITIALISE_SESSIONINFO } from "./store/actions/sessioninfo";
import { WorkflowEvents } from "./constants/workflowEvents";
import { INITIALISE_PARTICIPANT_DATA } from "./store/actions/participantData";
import { REACT_APP_VIDEOFLO_URL } from "./appConfig";

function App(props) {
  const pcc = useSelector((state) => state.pcc);
  const websocket = useSelector((state) => state.websocket);
  const sessionInfo = useSelector((state) => state.sessionInfo);
  const dispatch = useDispatch();
  /** checks wether clients props are valid or not */
  const [isSessionValidated, setIsSessionValidated] = useState(false);
  /** if true means WS connection has been established */
  const [isConnectionOk, setIsConnectionOk] = useState(false);
  /** Checks wether we have all boiler plates (activities and pcc configs) ready to get started */
  const [isSessionReadyToStart, setisSessionReadyToStart] = useState(false);

  const initializeWS = async () => {
    const ws_token = await getWsToken({
      sessionId: props.sessionId,
      participantId: props.participantId,
      token: props.token,
    });

    const url =
      localStorage.getItem("_vf_app_url") == undefined
        ? new URL(REACT_APP_VIDEOFLO_URL)
        : new URL(localStorage.getItem("_vf_app_url"));
    const wsRootUrl = `${url.protocol === "https:" ? "wss" : "ws"}://${
      url.host
    }`;
    const wsPath =
      url.pathname !== "/" ? `/${url.pathname}/socket.io` : "/socket.io";

    //Establishing WebSocket
    const socket = socketIOClient.connect(wsRootUrl, {
      secure: true,
      transports: ["websocket", "polling"],
      path: wsPath,
      query: { token: ws_token },
    });

    console.log("socket", socket);
    //Save WS to REdux
    dispatch({ type: INITIALISE_WEBSOCKET, payload: socket });
  };

  /**Emits initializeParticipantSession and gets session data from server
   * @sessionInfo {Dto.SessionJoinDto}
   */
  const initialiseSessionInfo = () => {
    console.log(websocket);
    console.log("__initialiseSessionInfo");
    return new Promise((resolve, reject) => {
      try {
        websocket.emit(WorkflowEvents.initializeParticipantSession, {});
        websocket.once(
          WorkflowEvents.initializeParticipantSession,
          (sessionInfo) => {
            resolve(sessionInfo);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  /** Checks wether we have all required fields present or not */
  const validateSessionConfigs = () => {
    //Validation logic (TODO)
    if (true) {
      if (props.apiUrl && props.sessionId && props.participantId && props.token)
        setIsSessionValidated(true);
    }
  };

  const createPccConfigFromSessionInfo = () => {
    //TODO render without condition below implementatio applys as of now
    //render based on customer and agent
    if (sessionInfo.role == "agent") {
      return [
        {
          name: "PERMISSION",
          data: sessionInfo.precallChecks.devicePermissions,
          role: "agent",
        },
      ];
    }
    if (sessionInfo.role == "customer") {
      return [
        {
          name: "CONSENT",
          data: sessionInfo.precallChecks.consent,
        },
        {
          name: "PERMISSION",
          data: sessionInfo.precallChecks.devicePermissions,
        },
        {
          name: "CUSTOM_CHECKLIST",
          data: sessionInfo.precallChecks.checklist,
        },

        // {
        //   name: "CUSTOM_CHECKLIST",
        //   data: sessionInfo.precallChecks.checklist[1],
        // },
        // {
        //   //name: "FINAL_PCC",
        //   name: "CUSTOM_CHECKLIST",
        //   data: sessionInfo.precallChecks.checklist[2],
        // },
      ];
    }
  };

  const createActivityConfigFromSessionInfo = () => {
    const activities = sessionInfo.activities.map((data, index) => {
      return {
        name: data.activityId,
        activityType: data.activityType,
        role: sessionInfo.participantName,
        data: {},
        key: index,
      };
    });

    return activities;
    // return [
    //   {
    //     name: "RANDOM_QnA_ACTIVITY",
    //     data: {},
    //   },
    //   {
    //     name: "LIVENESS_DETECTION_ACTIVITY",
    //     data: {},
    //   },
    //   {
    //     name: "PANCARD_DETECTION_ACTIVITY",
    //     data: {},
    //   },
    //   {
    //     name: "IMAGE_MATCH_ACTIVITY",
    //     data: {},
    //   },
    //   {
    //     name: "POSE_MATCH_ACTIVITY",
    //     data: {},
    //   },
    //   {
    //     name: "SIGNATURE_MATCH_ACTIVITY",
    //     data: {},
    //   },
    // ];
  };

  useEffect(async () => {
    //Validate sessionConfigs
    //Storing token for further use
    localStorage.setItem("_vf_app_url", props.apiUrl);
    validateSessionConfigs();
  }, []);

  useEffect(() => {
    validateSessionConfigs();
    if (props) {
      dispatch({
        type: INITIALISE_PARTICIPANT_DATA,
        payload: {
          apiUrl: props.apiUrl,
          sessionId: props.sessionId,
          participantId: props.participantId,
          token: props.token,
        },
      });
    }
  }, [props]);

  /**This Effect will run when we have a valid session data to proceed*/
  useEffect(async () => {
    if (isSessionValidated) {
      console.log("__Session Configs Validated");
      //Socket establishment
      try {
        await initializeWS();
        setIsConnectionOk(true);
        //Storing token for further use
        localStorage.setItem("_vf_token", props.token);
      } catch (err) {
        setIsConnectionOk(false);
        setTimeout(async () => {
          await initializeWS();
          setIsConnectionOk(true);
        }, 200);
      }
    }
  }, [isSessionValidated]);

  useEffect(async () => {
    if (websocket.io) {
      const sessionInfo = await initialiseSessionInfo();
      dispatch({ type: INITIALISE_SESSIONINFO, payload: sessionInfo });
    }
  }, [websocket]);

  useEffect(() => {
    if (sessionInfo && sessionInfo.sessionId) {
      dispatch({
        type: INITIALISE_PCC,
        payload: createPccConfigFromSessionInfo(),
      });
      dispatch({
        type: INITIALISE_ACTIVITIES,
        payload: createActivityConfigFromSessionInfo(),
      });
      setisSessionReadyToStart(true);
    }
  }, [sessionInfo]);

  return (
    <div>
      {isConnectionOk && isSessionReadyToStart ? (
        <>
          {" "}
          {pcc.isCompleted ? (
            <VideoFloContainer sessionInfo={sessionInfo}></VideoFloContainer>
          ) : (
            <PccContainer></PccContainer>
          )}{" "}
        </>
      ) : (
        <div> Validating.....</div>
      )}
    </div>
  );
}

export default App;

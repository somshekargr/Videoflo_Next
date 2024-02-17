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

import { pcc as PCC_NAMES } from "./constants/pcc";

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

    console.log(
      "#########################################################################",
      wsRootUrl,
      wsPath
    );
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
    //We will filter out only acceptedPCC from preceallChecks
    //if PCC alteady completed Then Only Check for Device permission
    let acceptedPCC = sessionInfo.precallChecks.isCompleted
      ? [PCC_NAMES.PERMISSION]
      : [PCC_NAMES.PERMISSION, PCC_NAMES.CUSTOM_CHECKLIST, PCC_NAMES.CONSENT];
    //Find out all the keys present in preceallChecks
    //Filter out pcc from precallChecks
    //modify pcc according to UI (Redux logic)
    const pcc_config = Object.keys(sessionInfo.precallChecks)
      .filter((pcc_key) => acceptedPCC.includes(pcc_key))
      .map((id) => {
        return {
          name: id,
          data: sessionInfo.precallChecks[id],
          role: sessionInfo.role,
        };
      });

    return pcc_config;
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
  };

  const _leaveSession = () => {
    console.warn("Leaving session.... Inform others");
    if (props?.leaveSession) props.leaveSession();
  };

  const _error = () => {
    console.warn("Error occured.... Inform others");
    if (props?.error) props.error();
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
    if (websocket != null) {
      const sessionInfo = await initialiseSessionInfo();
      console.warn("sessionInfo", sessionInfo);
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
            <VideoFloContainer
              leaveSession={_leaveSession}
              error={_error}
              sessionInfo={sessionInfo}
            ></VideoFloContainer>
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

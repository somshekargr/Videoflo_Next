import { getWsToken } from "./videoflo.service";
import socketIOClient from "socket.io-client";
import { REACT_APP_VIDEOFLO_URL } from "../appConfig";
import { LocalUserService } from "./localUser.service";

let socket;
let wsHost =
  localStorage.getItem("_vf_app_url") == undefined
    ? REACT_APP_VIDEOFLO_URL
    : localStorage.getItem("_vf_app_url");

export const connect = (videofloSessionId, participantId) => {
  const tokenInfo = getWsToken({
    body: {
      sessionId: videofloSessionId,
      participantId,
    },
  });

  //Establishing WebSocket
  socket = socketIOClient.connect(wsHost, {
    secure: true,
    query: { token: tokenInfo.accessToken },
  });

  //Store socket to Redux
};

export const getImageFromLocalStream = (width, height) => {
  const video =
    LocalUserService.getLocalUser().getStreamManager()?.videos[0].video;
  if (video) {
    const canvas = document.createElement("canvas");
    // scale the canvas accordingly
    canvas.width = width ? width : video.videoWidth;
    canvas.height = height ? height : video.videoHeight;
    // grab the frame from the video element and draw it on the canvas
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = { image: canvas.toDataURL("image/jpeg") };
    return imageData;
  }
};

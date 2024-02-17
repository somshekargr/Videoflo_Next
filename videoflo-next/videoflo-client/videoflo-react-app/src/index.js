import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import App from "./app";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import SessionConfig from "./components/demo-pages/first-page/session-config";
import DisplayLink from "./components/demo-pages/second-page/display-links";
import { REACT_APP_VIDEOFLO_URL } from "./appConfig";
const { base64decode } = require("nodejs-base64");

let participantData = {};

let encodedData = window.location.pathname;

if (encodedData.includes("join-session")) {
  encodedData = encodedData.toString().replace("/join-session/", "");

  let decodedData = base64decode(encodedData);
  decodedData = JSON.parse(decodedData);

  //Note -> Do not push these values to git. Remove values before commiting
  participantData = {
    apiUrl: `${REACT_APP_VIDEOFLO_URL}`,
    sessionId: decodedData.sessionId,
    participantId: decodedData.participantId,
    token: decodedData.token,
  };
}
// const
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<SessionConfig></SessionConfig>}></Route>
        <Route path="get-links" element={<DisplayLink></DisplayLink>}></Route>
        <Route
          path="join-session/:agentLink"
          element={
            <App
              apiUrl={participantData.apiUrl}
              sessionId={participantData.sessionId}
              participantId={participantData.participantId}
              token={participantData.token}
              leaveSession={() => {
                window.location.href = participantData.apiUrl
                  .replace("/api", "")
                  .concat("/home");
              }}
              error={() => {
                console.warn("error");
              }}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

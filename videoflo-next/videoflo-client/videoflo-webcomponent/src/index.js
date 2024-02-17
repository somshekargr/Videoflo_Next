import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import store from "./store";
import { Provider } from "react-redux";
import reactToWebComponent from "react-to-webcomponent";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function RootComponent({
  apiUrl,
  sessionId,
  participantId,
  token,
  error,
  leaveSession,
}) {
  const _leaveSession = () => {
    const customEvent = new CustomEvent("leaveSession", {
      detail: { name: "success!!" },
      bubbles: true,
      cancelable: false,
      composed: true,
    });
    document.dispatchEvent(customEvent);
  };

  const _error = () => {
    const customEvent = new CustomEvent("error", {
      detail: { name: "success!!" },
      bubbles: true,
      cancelable: false,
      composed: true,
    });
    document.dispatchEvent(customEvent);
  };

  return (
    <Provider store={store}>
      <App
        apiUrl="https://demo-api.videoflo.net/api"
        sessionId={sessionId}
        participantId={participantId}
        token={token}
        error={_error}
        leaveSession={_leaveSession}
      ></App>
    </Provider>
  );
}

RootComponent.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  participantId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  error: PropTypes.func,
  leaveSession: PropTypes.func,
};

const RootComponentWC = reactToWebComponent(RootComponent, React, ReactDOM, {
  shadow: false,
});

customElements.define("videoflo-webcomponent", RootComponentWC);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import store from "./store";
import { Provider } from "react-redux";

class WcWrapper extends HTMLElement {
  constructor() {
    super();
    this.props = {
      apiUrl: "",
      sessionId: "",
      participantId: "",
      token: "",
      error: () => {},
      leaveSession: () => {},
    };
  }

  connectedCallback() {
    this.root = this.attachShadow({ mode: "open" });
    this.mountpoint = document.createElement("div");
    this.root.appendChild(this.mountpoint);

    this.props.apiUrl = this.getAttribute("apiUrl");
    this.props.sessionId = this.getAttribute("sessionId");
    this.props.participantId = this.getAttribute("participantId");
    this.props.token = this.getAttribute("token");

    this.props.leaveSession = () => {
      const customEvent = new CustomEvent("leaveSession", {
        detail: { name: "success!!" },
        bubbles: true,
        cancelable: false,
        composed: true,
      });
      this.dispatchEvent(customEvent);
    };

    this.props.error = () => {
      const customEvent = new CustomEvent("error", {
        detail: { name: "success!!" },
        bubbles: true,
        cancelable: false,
        composed: true,
      });
      this.dispatchEvent(customEvent);
    };

    ReactDOM.render(
      <Provider store={store}>
        <App {...this.props} />
      </Provider>,
      this.mountpoint
    );
  }

  static get observedAttributes() {
    return ["apiUrl", "sessionId", "participantId", "token"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const updatedProps = { ...this.props, name: newValue };
    console.log(`attribute changed: ${name} => ${oldValue} to ${newValue} `);
    ReactDOM.render(
      <Provider store={store}>
        <App {...updatedProps} />
      </Provider>,
      this.mountpoint
    );
  }

  disconnectedCallback() {
    this.removeEventListener();
  }
}

customElements.define("videoflo-webcomponent", WcWrapper);

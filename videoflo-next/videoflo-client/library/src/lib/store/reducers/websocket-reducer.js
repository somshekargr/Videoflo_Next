import {INITIALISE_WEBSOCKET } from "../actions/websocket";

const websocketReducer = (state = {}, { type, payload }) => { 
  switch (type) {
    case INITIALISE_WEBSOCKET:
      return payload;
    default:
      return state;
  }
};

export default websocketReducer;

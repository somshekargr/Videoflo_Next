import {INITIALISE_SESSIONINFO } from "../actions/sessioninfo";

const sessionInfoReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case INITIALISE_SESSIONINFO:
      return Object.assign({}, payload);
    default:
      return state;
  }
};

export default sessionInfoReducer;

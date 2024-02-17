import {INITIALISE_PARTICIPANT_DATA } from "../actions/participantData";

const participantDataReducer = (state = {}, { type, payload }) => { 
  switch (type) {
    case INITIALISE_PARTICIPANT_DATA:
      return payload;
    default:
      return state;
  }
};

export default participantDataReducer;

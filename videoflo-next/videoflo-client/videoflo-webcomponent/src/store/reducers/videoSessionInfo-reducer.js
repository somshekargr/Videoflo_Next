import { VIDEO_SESSION_JOIN_INFO} from "../actions/videoSessionInfo";

const videoSessioJoinInfoReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case VIDEO_SESSION_JOIN_INFO:
      return Object.assign({}, payload);
    default:
      return state;
  }
};

export default videoSessioJoinInfoReducer;

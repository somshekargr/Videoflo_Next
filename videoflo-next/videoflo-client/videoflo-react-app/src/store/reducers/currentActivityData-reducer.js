import {
  INITILIZE_ACTIVITY,
  NEXT_ACTIVITY,
  END_ACTIVITY,
} from "../actions/currentActivtyData";

const currentActivtyReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case INITILIZE_ACTIVITY:
      return payload;

    default:
      return state;
  }
};

export default currentActivtyReducer;

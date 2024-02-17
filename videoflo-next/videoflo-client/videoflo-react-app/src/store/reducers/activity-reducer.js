import {
  INITIALISE_ACTIVITIES,
  NEXT_ACTIVITY,
  CHANGE_ACTIVITY_STATUS,
} from "../actions/activity";
// import { createSlice } from "@reduxjs/toolkit";

// export const activitySlice = createSlice({
//   name: "activity",
//   initialState: { value: { activityName: "LIVENESS_DETECTION_ACTIVITY" } },
//   reducers: {
//     activityReducer: (state, action) => {
//       switch (action.type) {
//         case LIVENESS_DETECTION_ACTIVITY:
//           //return Object.assign({}, { ...state, activityName: action.payload });
//           state.value = action.payload;
//           break;
//         default:
//           return state;
//       }
//     },
//   },
// });

const activityReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case INITIALISE_ACTIVITIES:
      return Object.assign(
        {},
        {
          ...state,
          activeIndex: 0,
          activeActivityName: payload[0].name,
          role: payload[0].role,
          activityConfig: payload,
        }
      );

    case NEXT_ACTIVITY:
      return Object.assign(
        {},
        {
          ...state,
          activeIndex: state.activeIndex + 1,
          activeActivityName: state.activityConfig[state.activeIndex + 1].name,
          role: state.role,
        }
      );
    case CHANGE_ACTIVITY_STATUS:
      return Object.assign({}, { ...state, isCompleted: payload });
    default:
      return state;
  }
};

export default activityReducer;

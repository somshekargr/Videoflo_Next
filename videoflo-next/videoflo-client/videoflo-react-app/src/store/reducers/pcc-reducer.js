import { createSlice } from "@reduxjs/toolkit";
import { pcc } from "../../constants/pcc";
import {
  CHANGE_PCC_STATUS,
  INITIALISE_PCC,
  NEXT_CONSENT,
} from "../actions/pcc-action";

// export const pccSlice = createSlice({
//   name: "pcc",
//   initialState: { value: [] },
//   reducers: {
//     pccReducer: (state, action) => {
//       switch (action.type) {
//         case INITIALISE_PCC:
//           console.log(action.payload);
//           return Object.assign({}, { ...state, value: action.payload });
//         //state = action.payload;
//         //break;
//         default:
//           return state;
//       }
//     },
//   },
// });

const pccReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case INITIALISE_PCC:
      return Object.assign(
        {},
        {
          ...state,
          activeIndex: 0,
          activePccName: payload[0].name,
          pccConfig: payload,
        }
      );
    case NEXT_CONSENT:
      return Object.assign(
        {},
        {
          ...state,
          activeIndex: state.activeIndex + 1,
          activePccName: state.pccConfig[state.activeIndex + 1].name,
        }
      );
    case CHANGE_PCC_STATUS:
      return Object.assign({}, { ...state, isCompleted: payload });

    default:
      return state;
  }
};

export default pccReducer;
//export default pccSlice.reducer;

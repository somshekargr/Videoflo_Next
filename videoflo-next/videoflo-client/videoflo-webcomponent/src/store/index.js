// import { configureStore } from "@reduxjs/toolkit";
// import activityReducer from "./reducers/activity-reducer";
// import pccReducer from "./reducers/pcc-reducer";

// const store = configureStore({
//   reducer: { activity: activityReducer, pcc: pccReducer },
// });
// export default store;

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
import pccReducer from "./reducers/pcc-reducer";
import activityReducer from "./reducers/activity-reducer";
import websocketReducer from "./reducers/websocket-reducer";
import sessionInfoReducer from "./reducers/sessionInfo-reducer";
import videoSessioJoinInfoReducer from "./reducers/videoSessionInfo-reducer";
import participantDataReducer from "./reducers/participantData-reducer";
import currentActivtyReducer from "./reducers/currentActivityData-reducer";

const InitialState = {
  activity: {},
  pcc: {},
  websocket: null,
  sessionInfo: {},
  videoSessioJoinInfo: null,
  participantData: null,
  currentActivityData: {},
};

const allReducers = combineReducers({
  pcc: pccReducer,
  activity: activityReducer,
  websocket: websocketReducer,
  sessionInfo: sessionInfoReducer,
  videoSessioJoinInfo: videoSessioJoinInfoReducer,
  participantData: participantDataReducer,
  currentActivityData: currentActivtyReducer,
});

// const middleware = [thunk];

const store = createStore(allReducers, InitialState);

// const store = createStore(allReducers,InitialState, compose(
//   applyMiddleware(...middleware)
// ), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

import { combineReducers } from "redux";
import navigateReducer from "./navigateReducer";
import stageReducer from "./stageReducer";

const reducers = combineReducers({
  navigate: navigateReducer,
  stage: stageReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

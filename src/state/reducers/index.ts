import { combineReducers } from "redux";
import navigateReducer from "./navigateReducer";

const reducers = combineReducers({
  navigate: navigateReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

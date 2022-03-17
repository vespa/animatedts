import { Dispatch } from "redux";
import { ActionStageType, StateStageProps } from "../action-types";
import { ActionStage } from "../actions";

export const setStageSize = (pos: StateStageProps) => {
  return (dispatch: Dispatch<ActionStage>) => {
    dispatch({
      type: ActionStageType.SET_STAGE_SIZE,
      payload: pos,
    });
  };
};

import { Dispatch } from "redux";
import { ActionNavigateType } from "../action-types";
import { ActionNavigate } from "../actions";

export const moveTop = (pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      type: ActionNavigateType.TOP,
      payload: pos,
    });
  };
};

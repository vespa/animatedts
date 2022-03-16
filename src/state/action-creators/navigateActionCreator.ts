import { Dispatch } from "redux";
import { ActionNavigateType } from "../action-types";
import {
  ActionNavigate,
  ActionNavigateFix,
  ActionNavigateFixPayload,
} from "../actions";

export const moveTop = (pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      type: ActionNavigateType.TOP,
      payload: pos,
    });
  };
};

export const moveDown = (pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      type: ActionNavigateType.BOTTOM,
      payload: pos,
    });
  };
};

export const moveRight = (pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      type: ActionNavigateType.RIGHT,
      payload: pos,
    });
  };
};

export const moveLeft = (pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      type: ActionNavigateType.LEFT,
      payload: pos,
    });
  };
};

export const moveFixed = (pos: ActionNavigateFixPayload) => {
  return (dispatch: Dispatch<ActionNavigateFix>) => {
    dispatch({
      type: ActionNavigateType.FIXED,
      payload: {
        left: pos.left,
        top: pos.top,
      },
    });
  };
};






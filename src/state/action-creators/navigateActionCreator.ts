import { Dispatch } from "redux";
import { ActionNavigateType } from "../action-types";
import {
  ActionNavigate,
  ActionNavigateFix,
  ActionNavigateFixPayload,
} from "../actions";

export const moveTop = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: ActionNavigateType.TOP,
      payload: pos,
    });
  };
};

export const moveDown = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: ActionNavigateType.BOTTOM,
      payload: pos,
    });
  };
};

export const moveRight = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: ActionNavigateType.RIGHT,
      payload: pos,
    });
  };
};

export const moveLeft = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: ActionNavigateType.LEFT,
      payload: pos,
    });
  };
};

export const moveFixed = (id: string, pos: ActionNavigateFixPayload) => {
  return (dispatch: Dispatch<ActionNavigateFix>) => {
    dispatch({
      id,
      type: ActionNavigateType.FIXED,
      payload: {
        left: pos.left,
        top: pos.top,
      },
    });
  };
};






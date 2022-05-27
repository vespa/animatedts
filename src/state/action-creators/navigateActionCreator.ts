import { Dispatch } from "redux";
import { ActionNavigateType } from "../action-types";
import {
  ActionNavigate,
  // ActionNavigateFix,
  ActionNavigateFixPayload,
} from "../actions";

export const moveTop = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: ActionNavigateType.ARROW_UP,
      payload: pos,
    });
  };
};

export const moveDown = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: ActionNavigateType.ARROW_DOWN,
      payload: pos,
    });
  };
};

export const moveRight = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: ActionNavigateType.ARROW_RIGHT,
      payload: pos,
    });
  };
};

export const moveLeft = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: ActionNavigateType.ARROW_LEFT,
      payload: pos,
    });
  };
};

export const registerPosition = (id: string, pos: ActionNavigateFixPayload) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: ActionNavigateType.REGISTER_TOP,
      payload: pos.top,
    });
    dispatch({
      id,
      type: ActionNavigateType.REGISTER_LEFT,
      payload: pos.left,
    });
  };
};






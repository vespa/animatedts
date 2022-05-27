import { Dispatch } from "redux";
import { DirectionsNavigateKeys, ActionNavigateTypeSetPos } from "../action-types";
import {
  ActionNavigate,
  ActionNavigateFixPayload,
} from "../actions";

export const moveTop = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: DirectionsNavigateKeys.UP,
      payload: pos,
    });
  };
};

export const moveDown = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: DirectionsNavigateKeys.DOWN,
      payload: pos,
    });
  };
};

export const moveRight = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: DirectionsNavigateKeys.RIGHT,
      payload: pos,
    });
  };
};

export const moveLeft = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: DirectionsNavigateKeys.LEFT,
      payload: pos,
    });
  };
};

export const registerPosition = (id: string, pos: ActionNavigateFixPayload) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: ActionNavigateTypeSetPos.REGISTER_TOP,
      payload: pos.top,
    });
    dispatch({
      id,
      type: ActionNavigateTypeSetPos.REGISTER_LEFT,
      payload: pos.left,
    });
  };
};






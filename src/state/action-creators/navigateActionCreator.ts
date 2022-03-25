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
      type: ActionNavigateType.ArrowUp,
      payload: pos,
    });
  };
};

export const moveDown = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: ActionNavigateType.ArrowDown,
      payload: pos,
    });
  };
};

export const moveRight = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: ActionNavigateType.ArrowRight,
      payload: pos,
    });
  };
};

export const moveLeft = (id: string, pos: number) => {
  return (dispatch: Dispatch<ActionNavigate>) => {
    dispatch({
      id,
      type: ActionNavigateType.ArrowLeft,
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

export const registerPosition = (id: string, pos: ActionNavigateFixPayload) => {
  return (dispatch: Dispatch<ActionNavigateFix>) => {
    dispatch({
      id,
      type: ActionNavigateType.REGISTER,
      payload: {
        left: pos.left,
        top: pos.top,
      },
    });
  };
};






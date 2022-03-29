import { ActionTypes } from "../action-types";

export interface ActionNavigate {
  id: string;
  type: ActionTypes;
  payload: number;
}

export interface ActionNavigateRun {
  id: string;
  type: ActionTypes;
  payload: number;
}

export interface ActionNavigateFixPayload {
  left: number;
  top: number;
}
export interface ActionNavigateFix {
  id: string;
  type: ActionTypes;
  payload: ActionNavigateFixPayload;
}

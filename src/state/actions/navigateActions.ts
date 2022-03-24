import { ActionNavigateType } from "../action-types";

type ActionTypes =
  | ActionNavigateType.BOTTOM
  | ActionNavigateType.TOP
  | ActionNavigateType.LEFT
  | ActionNavigateType.RIGHT
  | ActionNavigateType.FIXED
  | ActionNavigateType.REGISTER;
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
  left: string | number;
  top: string | number;
}
export interface ActionNavigateFix {
  id: string;
  type: ActionTypes;
  payload: ActionNavigateFixPayload;
}

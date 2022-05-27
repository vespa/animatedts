import { ActionNavigateType } from "../action-types";

export interface ActionNavigate {
  id: string;
  type: ActionNavigateType;
  payload: number;
}

export interface ActionNavigateRun {
  id: string;
  type: ActionNavigateType;
  payload: number;
}

export interface ActionNavigateFixPayload {
  left: number;
  top: number;
}
export interface ActionNavigateFix {
  id: string;
  type: ActionNavigateType;
  payload: ActionNavigateFixPayload;
}

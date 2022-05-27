import { ActionNavigateTypeKeys, ActionNavigateTypeSetPos } from "../action-types";

export interface ActionNavigate {
  id: string;
  type: ActionNavigateTypeKeys;
  payload: number;
}

export interface ActionNavigateRun {
  id: string;
  type: ActionNavigateTypeSetPos;
  payload: number;
}

export interface ActionNavigateFixPayload {
  left: number;
  top: number;
}
export interface ActionNavigateFix {
  id: string;
  type: ActionNavigateTypeKeys;
  payload: ActionNavigateFixPayload;
}

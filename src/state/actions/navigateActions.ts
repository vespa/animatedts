import { ActionNavigateTypeKeys, ActionNavigateTypeSetPos } from "../action-types";

export interface ActionNavigate {
  id: string;
  type: ActionNavigateTypeKeys | ActionNavigateTypeSetPos;
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

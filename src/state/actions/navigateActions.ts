import { DirectionsNavigateKeys, ActionNavigateTypeSetPos } from "../action-types";

export interface ActionNavigate {
  id: string;
  type: DirectionsNavigateKeys | ActionNavigateTypeSetPos;
  payload: number;
}

export interface ActionNavigateFixPayload {
  left: number;
  top: number;
}
export interface ActionNavigateFix {
  id: string;
  type: DirectionsNavigateKeys;
  payload: ActionNavigateFixPayload;
}

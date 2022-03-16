import { ActionNavigateType } from "../action-types";

type ActionTypes =
  | ActionNavigateType.BOTTOM
  | ActionNavigateType.TOP
  | ActionNavigateType.LEFT
  | ActionNavigateType.RIGHT
  | ActionNavigateType.FIXED;
export interface ActionNavigate {
  type: ActionTypes;
  payload: number;
}

export interface ActionNavigateFixPayload {
  left: string | number;
  top: string | number;
}
export interface ActionNavigateFix {
  type: ActionTypes;
  payload: ActionNavigateFixPayload;
}

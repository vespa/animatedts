import { ActionStageType, StateStageProps } from "../action-types";

export interface ActionStage {
  type: ActionStageType.SET_STAGE_SIZE;
  payload: StateStageProps;
}

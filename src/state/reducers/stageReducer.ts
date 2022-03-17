import { ActionStageType, StateStageProps } from "../action-types";
import { ActionStage } from "../actions";

const initialState: StateStageProps = {
  width: 800,
  height: 600,
};
export const stageReducer = (
  state: StateStageProps = initialState,
  action: ActionStage
) => {
  switch (action.type) {
    case ActionStageType.SET_STAGE_SIZE:
      return action.payload;
    default:
      return state;
  }
};

export default stageReducer;

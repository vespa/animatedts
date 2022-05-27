import {
  ActionNavigateTypeKeys,
  ActionNavigateTypeSetPos,
  PositionProps,
  CharGroupProps,
} from "../action-types";
import { ActionNavigate, ActionNavigateRun } from "../actions";

const initialState: PositionProps = {
  left: 0,
  top: 0,
  running: 0,
};

const reducerNavigation = (
  state: CharGroupProps = {},
  { id, type, payload }: ActionNavigate | ActionNavigateRun
): CharGroupProps => {
  const getCurrent = state[id] || initialState;
  switch (type) {
    case ActionNavigateTypeKeys.ARROW_UP:
      return {
        ...state,
        [id]: { ...getCurrent, top: getCurrent.top - payload },
      };
    case ActionNavigateTypeKeys.ARROW_DOWN:
      return {
        ...state,
        [id]: { ...getCurrent, top: getCurrent.top + payload },
      };
    case ActionNavigateTypeKeys.ARROW_LEFT:
      return {
        ...state,
        [id]: { ...getCurrent, left: getCurrent.left - payload },
      };
    case ActionNavigateTypeKeys.ARROW_RIGHT:
      return {
        ...state,
        [id]: { ...getCurrent, left: getCurrent.left + payload },
      };

    case ActionNavigateTypeSetPos.REGISTER_LEFT:
      return {
        ...state,
        [id]: { ...getCurrent, left: payload },
      };
    case ActionNavigateTypeSetPos.REGISTER_TOP:
      return {
        ...state,
        [id]: { ...getCurrent, top: payload },
      };
    default:
      return state;
  }
};

export default reducerNavigation;

import {
  ActionNavigateType,
  PositionProps,
  CharGroupProps,
} from "../action-types";
import { ActionNavigate } from "../actions";

const initialState: PositionProps = {
  left: 0,
  top: 0,
  running: 0,
};

const reducerNavigation = (
  state: CharGroupProps = {},
  { id, type, payload }: ActionNavigate
): CharGroupProps => {
  const getCurrent = state[id] || initialState;
  switch (type) {
    case ActionNavigateType.ARROW_UP:
      return {
        ...state,
        [id]: { ...getCurrent, top: getCurrent.top - payload },
      };
    case ActionNavigateType.ARROW_DOWN:
      return {
        ...state,
        [id]: { ...getCurrent, top: getCurrent.top + payload },
      };
    case ActionNavigateType.ARROW_LEFT:
      return {
        ...state,
        [id]: { ...getCurrent, left: getCurrent.left - payload },
      };
    case ActionNavigateType.ARROW_RIGHT:
      return {
        ...state,
        [id]: { ...getCurrent, left: getCurrent.left + payload },
      };

    case ActionNavigateType.REGISTER_LEFT:
      return {
        ...state,
        [id]: { ...getCurrent, left: payload },
      };
    case ActionNavigateType.REGISTER_TOP:
      return {
        ...state,
        [id]: { ...getCurrent, top: payload },
      };
    default:
      return state;
  }
};

export default reducerNavigation;

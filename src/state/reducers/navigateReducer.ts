import {
  ActionNavigateType,
  PositionProps,
  CharGroupProps,
} from "../action-types";
import { ActionNavigate } from "../actions";

const initialState: PositionProps = {
  left: 0,
  top: 0,
};

const reducerNavigation = (
  state: CharGroupProps = {},
  { id, type, payload }: ActionNavigate
) => {
  const getCurrent = state[id] || initialState;
  switch (type) {
    case ActionNavigateType.TOP:
      return {
        ...state,
        [id]: { ...getCurrent, top: getCurrent.top - payload },
      };
    case ActionNavigateType.BOTTOM:
      return {
        ...state,
        [id]: { ...getCurrent, top: getCurrent.top + payload },
      };
    case ActionNavigateType.LEFT:
      return {
        ...state,
        [id]: { ...getCurrent, left: getCurrent.left + payload },
      };
    case ActionNavigateType.RIGHT:
      return {
        ...state,
        [id]: { ...getCurrent, left: getCurrent.left - payload },
      };
    case ActionNavigateType.FIXED:
      return {
        ...state,
        [id]: payload,
      };
    default:
      return state;
  }
};

export default reducerNavigation;

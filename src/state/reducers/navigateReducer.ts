import {
  DirectionsNavigateKeys,
  ActionNavigateTypeSetPos,
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
    case DirectionsNavigateKeys.UP:
      return {
        ...state,
        [id]: { ...getCurrent, top: getCurrent.top - payload },
      };
    case DirectionsNavigateKeys.DOWN:
      return {
        ...state,
        [id]: { ...getCurrent, top: getCurrent.top + payload },
      };
    case DirectionsNavigateKeys.LEFT:
      return {
        ...state,
        [id]: { ...getCurrent, left: getCurrent.left - payload },
      };
    case DirectionsNavigateKeys.RIGHT:
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

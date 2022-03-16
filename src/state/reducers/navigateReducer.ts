import { ActionNavigateType, PositionProps } from "../action-types";
import { ActionNavigate } from "../actions";

const initialState: PositionProps = {
  left: 0,
  top: 0,
};

const reducer = (
  state: PositionProps = initialState,
  { type, payload }: ActionNavigate
) => {
  switch (type) {
    case ActionNavigateType.TOP:
      return { ...state, top: state.top - payload };
    case ActionNavigateType.BOTTOM:
      return { ...state, top: state.top + payload };
    case ActionNavigateType.LEFT:
      return { ...state, left: state.top - payload };
    case ActionNavigateType.RIGHT:
      return { ...state, left: state.top + payload };
    default:
      return state;
  }
};

export default reducer;

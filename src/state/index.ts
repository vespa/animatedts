export enum ActionNavigateType {
  TOP = "up",
  BOTTOM = "down",
  LEFT = "left",
  RIGHT = "right",
}

type stateProps = {
  left: number;
  top: number;
};

const initialState: stateProps = {
  left: 0,
  top: 0,
};

interface ActionNavigate {
  type: string;
  payload: {
    [key in ActionNavigateType]: string;
  };
}

const reducer = (state: stateProps = initialState, action: ActionNavigate) => {
  switch (action.type) {
    case ActionNavigateType.TOP:
      return state;
    case ActionNavigateType.BOTTOM:
      return state;
    case ActionNavigateType.LEFT:
      return state;
    case ActionNavigateType.RIGHT:
      return state;
    default:
      return state;
  }
};

export default reducer;

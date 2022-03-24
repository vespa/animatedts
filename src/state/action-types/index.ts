export enum ActionNavigateType {
  TOP = "up",
  BOTTOM = "down",
  LEFT = "left",
  RIGHT = "right",
  FIXED = "fixed",
  REGISTER = "register",
  RUNNING = "running",
}

export interface PositionProps {
  left: number;
  top: number;
  running?: 1 | 0;
}

export interface CharGroupProps {
  [key: string]: PositionProps;
}

// STAGE
export interface StateStageProps {
  width: number;
  height: number;
}

export enum ActionStageType {
  SET_STAGE_SIZE = "set_stage_size",
}
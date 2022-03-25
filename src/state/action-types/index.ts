export enum ActionNavigateType {
  ArrowUp = "up",
  ArrowDown = "down",
  ArrowLeft = "left",
  ArrowRight = "right",
  FIXED = "fixed",
  REGISTER = "register",
  RUNNING = "running",
}

export type ActionTypes =
  | ActionNavigateType.ArrowDown
  | ActionNavigateType.ArrowUp
  | ActionNavigateType.ArrowLeft
  | ActionNavigateType.ArrowRight
  | ActionNavigateType.FIXED
  | ActionNavigateType.REGISTER;

export type DirectionTypes =
  | ActionNavigateType.ArrowDown
  | ActionNavigateType.ArrowUp
  | ActionNavigateType.ArrowLeft
  | ActionNavigateType.ArrowRight;

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
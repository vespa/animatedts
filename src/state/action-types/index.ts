export enum ActionNavigateType {
  // key names, do not change
  ARROW_UP = "ArrowUp",
  ARROW_DOWN = "ArrowDown",
  ARROW_LEFT = "ArrowLeft",
  ARROW_RIGHT = "ArrowRight",
  // extra statuses
  FIXED = "fixed",
  REGISTER = "register",
  REGISTER_TOP = "register_TOP",
  REGISTER_LEFT = "register_LEFT",
  RUNNING = "running",
}

export type DirectionTypes =
  | ActionNavigateType.ARROW_DOWN
  | ActionNavigateType.ARROW_UP
  | ActionNavigateType.ARROW_LEFT
  | ActionNavigateType.ARROW_RIGHT;

export interface PositionProps {
  left: number;
  top: number;
  running?: 1 | 0;
}

export interface CharGroupProps {
  [key: string]: PositionProps;
}
[];

// STAGE
export interface StateStageProps {
  width: number;
  height: number;
  loaded?: boolean;
}

export enum ActionStageType {
  SET_STAGE_SIZE = "set_stage_size",
}

export interface CharacterArrowNavProps {
  id: string;
  running?: boolean;
  setDirection?: (command: DirectionTypes) => void;
  setRunning?: (command: boolean) => void;
  startPosition?: {
    left: string | number;
    top: string | number;
  };
}

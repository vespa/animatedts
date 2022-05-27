export enum ActionNavigateTypeSetPos {
  FIXED = "fixed",
  REGISTER = "register",
  REGISTER_TOP = "register_TOP",
  REGISTER_LEFT = "register_LEFT",
  RUNNING = "running",
}

export enum DirectionsNavigateKeys {
  // keyboard key names, do not change
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
  // Other movements
  STATIC_MOVES = 'static'
}
// convert enum DirectionsNavigateKeys into type
export type DirectionTypes = `${DirectionsNavigateKeys}`

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

export interface NavArrowsProps {
  id: string;
  running?: boolean;
  setDirection?: (command: DirectionTypes) => void;
  setRunning?: (command: boolean) => void;
  startPosition?: {
    left: string | number;
    top: string | number;
  };
}

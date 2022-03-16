export enum ActionNavigateType {
  TOP = "up",
  BOTTOM = "down",
  LEFT = "left",
  RIGHT = "right",
  FIXED = "fixed",
}

export interface PositionProps {
  left: number;
  top: number;
}

export interface CharGroupProps {
  [key: string]: PositionProps;
}
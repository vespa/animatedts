import { useState } from "react";
import { NavArrowsProps } from "state/action-types";
import { DirectionTypes, DirectionsNavigateKeys } from "state/action-types";
import { NavArrows } from "components/NavArrows";
import AnimatedSprite from "components/AnimatedSprite/AnimatedSprite";

interface AnimatedSpriteProps {
  /** default sprite position when animation is stopped */
  defaultPos?: number;
  /** defines if the animation should be triggered. If not, it assumes default position */
  running?: boolean;
  /** this value should fits the exact width of the sprite tiles division */
  width: number;
  /** this value should fits the exact height of the horizontal sprite */
  height: number;
  /** src for sprite image */
  sprite: string;
  /** selected sprites for animation when left vector is running */
  toLeft: number[];
  /** selected sprites for animation when right vector is running */
  toRight: number[];
  /** selected sprites for animation when down vector is running */
  toBottom: number[];
  /** selected sprites for animation when up vector is running */
  toTop: number[];
  /** defines with set of sprites should be triggered */
  direction?: DirectionTypes;
}

/**
 * Component that manages sprite animations. The sprite should be a horizontal sheet with tiles each one with one of the frames of the animation.
 * Each tile should have exactly the same width and the image should be perfectly centralized according to expected effect
 *
 * */

interface AnimatedSpriteNavProps extends AnimatedSpriteProps, NavArrowsProps { }

export const AnimatedSpriteNavByArrows: React.FC<AnimatedSpriteNavProps> = (props) => {
  const [direction, setDirection] = useState<DirectionTypes>(
    DirectionsNavigateKeys.LEFT
  );
  const [running, setRunning] = useState<boolean>(false);
  const { id, startPosition, ...rest } = props;
  return (
    <NavArrows
      id={id}
      startPosition={startPosition}
      setDirection={setDirection}
      setRunning={setRunning}
      running={running}
    >
      <AnimatedSprite {...rest} direction={direction} running={running} />
    </NavArrows>
  );
};
export default AnimatedSpriteNavByArrows;

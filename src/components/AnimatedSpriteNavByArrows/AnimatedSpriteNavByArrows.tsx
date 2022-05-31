import { useState } from "react";
import { NavArrowsProps } from "state/action-types";
import { DirectionTypes, DirectionsNavigateKeys } from "state/action-types";
import { NavArrows } from "components/NavArrows";
import AnimatedSprite, { AnimatedSpriteProps } from "components/AnimatedSprite/AnimatedSprite";

/**
 * Component that manages sprite animations. The sprite should be a horizontal sheet with tiles each one with one of the frames of the animation.
 * Each tile should have exactly the same width and the image should be perfectly centralized according to expected effect
 *
 * */

interface AnimatedSpriteNavProps extends Omit<AnimatedSpriteProps, "id">, NavArrowsProps { }

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
      <AnimatedSprite {...rest} direction={direction} running={running} id={id} />
    </NavArrows>
  );
};
export default AnimatedSpriteNavByArrows;

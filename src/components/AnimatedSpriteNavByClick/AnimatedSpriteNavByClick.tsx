import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { DirectionTypes, DirectionsNavigateKeys } from "state/action-types";
import AnimatedSprite, { AnimatedSpriteProps } from "components/AnimatedSprite/AnimatedSprite";
import { RootState } from "state/reducers";

/**
 * Component that manages sprite animations. The sprite should be a horizontal sheet with tiles each one with one of the frames of the animation.
 * Each tile should have exactly the same width and the image should be perfectly centralized according to expected effect
 *
 * */
const NavByClick: React.FC = ({ children }) => {
  const { stage } = useSelector((state: RootState) => state.stage);
  useEffect(() => {
    stage && console.log(stage)
  }, [stage])

  return <>{children}</>
}

export const AnimatedSpriteNavByClick: React.FC<AnimatedSpriteProps> = (props) => {

  const [direction, setDirection] = useState<DirectionTypes>(
    DirectionsNavigateKeys.LEFT
  );
  const [running, setRunning] = useState<boolean>(false);
  const { id, ...rest } = props;
  return (
    <NavByClick>
      <AnimatedSprite {...rest} direction={direction} running={running} id={id} />
    </NavByClick>
  );
};
export default AnimatedSpriteNavByClick;

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { DirectionTypes, DirectionsNavigateKeys } from "state/action-types";
import AnimatedSprite, { AnimatedSpriteProps } from "components/AnimatedSprite/AnimatedSprite";
import { RootState } from "state/reducers";
import styles from "./AnimatedSpriteNavByClick.module.scss";


/**
 * Component that manages sprite animations. The sprite should be a horizontal sheet with tiles each one with one of the frames of the animation.
 * Each tile should have exactly the same width and the image should be perfectly centralized according to expected effect
 *
 * */
type navByClickProps = {
  className: string
}
const NavByClick: React.FC<navByClickProps> = ({ children, className }) => {
  const [top, setTop] = useState<number | string>("")
  const [left, setLeft] = useState<number | string>("")
  const { stage } = useSelector((state: RootState) => state.stage);
  const configureStage = useCallback(() => {
    stage?.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault()
      setTop(e.offsetY)
      setLeft(e.offsetX)
    })
  }, [stage])

  useEffect(() => {
    stage && configureStage()
  }, [stage, configureStage])

  return <div className={className} style={{ top, left }}>{children}</div>
}

export const AnimatedSpriteNavByClick: React.FC<AnimatedSpriteProps> = (props) => {

  const [direction] = useState<DirectionTypes>(
    DirectionsNavigateKeys.DOWN
  );
  const [running] = useState<boolean>(false);
  const { id, ...rest } = props;
  return (
    <NavByClick className={`${styles.char}`}>
      <AnimatedSprite {...rest} direction={direction} running={running} id={id} />
    </NavByClick>
  );
};
export default AnimatedSpriteNavByClick;

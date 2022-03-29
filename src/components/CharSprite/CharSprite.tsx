import { useEffect, useState } from "react";
import styles from "./CharSprite.module.scss";
import { CharacterArrowNavProps } from "state/action-types";

import { DirectionTypes, ActionNavigateType } from "state/action-types";
import { CharacterArrowNav } from "components/CharacterArrowNav";
interface CharSpriteProps {
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
  direction: DirectionTypes;
}

/**
 * Component that manages sprite animations. The sprite should be a horizontal sheet with tiles each one with one of the frames of the animation.
 * Each tile should have exactly the same width and the image should be perfectly centralized according to expected effect
 *
 * */

export const CharSprite: React.FC<CharSpriteProps> = ({
  defaultPos = 0,
  running = false,
  width,
  height,
  sprite,
  toLeft = [],
  toRight = [],
  toBottom = [],
  toTop = [],
  direction,
}) => {
  const defaultMainPos = -(defaultPos * width);
  let interval: NodeJS.Timeout;
  //   const [animateFrames, setAnimateFrames] = useState(toLeft);
  const [steps, setSteps] = useState<number[]>([]);
  const [current, setCurrent] = useState<number>(defaultMainPos);

  const configureAnimatioin = (values: number[]) => {
    const stepsPos = values.map((item: number) => -(item * width));
    setSteps(stepsPos);
  };

  const changeDirection = {
    [ActionNavigateType.ArrowLeft]: () => configureAnimatioin(toLeft),
    [ActionNavigateType.ArrowRight]: () => {
      configureAnimatioin(toRight);
    },
    [ActionNavigateType.ArrowUp]: () => configureAnimatioin(toTop),
    [ActionNavigateType.ArrowDown]: () => configureAnimatioin(toBottom),
  };

  useEffect(() => {
    changeDirection[direction]();
  }, [direction]);

  useEffect(() => {
    const callNextSteps = (steps: number[], index = 0) => {
      if (steps.length === 0) {
        return false;
      }
      const step: number = steps[index];
      interval = setTimeout(() => {
        clearInterval(interval);
        if (step) {
          setCurrent(step);
          callNextSteps(steps, index + 1);
        } else {
          callNextSteps(steps, 0);
        }
      }, 60);
    };
    running && callNextSteps(steps);
    !running &&
      (() => {
        clearInterval(interval);
        setCurrent(defaultMainPos);
      })();
    return () => {
      clearInterval(interval);
      setCurrent(defaultMainPos);
    };
  }, [steps, running, direction]);

  return (
    <div className={styles.char} style={{ width, height }}>
      <div
        className={styles.char__container}
        style={{ left: current ?? defaultMainPos }}
      >
        <img alt={"main char"} src={sprite} />
      </div>
    </div>
  );
};

interface CharSpriteNavProps extends CharSpriteProps, CharacterArrowNavProps {}

export const CharSpriteArrowNav: React.FC<CharSpriteNavProps> = (props) => {
  const [direction, setDirection] = useState<DirectionTypes>(
    ActionNavigateType.ArrowLeft
  );
  const [running, setRunning] = useState<boolean>(false);
  const { id, startPosition, ...rest } = props;
  return (
    <CharacterArrowNav
      id={id}
      startPosition={startPosition}
      setDirection={setDirection}
      setRunning={setRunning}
      running={running}
    >
      <CharSprite {...rest} direction={direction} running={running} />
    </CharacterArrowNav>
  );
};
export default CharSprite;

import { useLayoutEffect, useState } from "react";
import styles from "./AnimatedSprite.module.scss";
import { DirectionTypes, DirectionsNavigateKeys } from "state/action-types";
export interface AnimatedSpriteProps {
  /** fixed position on stage */
  id?: string,
  position?: {
    left: string | number;
    top: string | number;
  };
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
  toLeft?: number[];
  /** selected sprites for animation when right vector is running */
  toRight?: number[];
  /** selected sprites for animation when down vector is running */
  toBottom?: number[];
  /** selected sprites for animation when up vector is running */
  toTop?: number[];
  /** defines with set of sprites should be triggered */
  staticElementMoves?: number[];
  direction?: DirectionTypes;
}

/**
 * Component that manages sprite animations. The sprite should be a horizontal sheet with tiles each one with one of the frames of the animation.
 * Each tile should have exactly the same width and the image should be perfectly centralized according to expected effect
 *
 * */

export const AnimatedSprite: React.FC<AnimatedSpriteProps> = ({
  id,
  defaultPos = 0,
  running = false,
  width,
  height,
  sprite,
  toLeft = [],
  toRight = [],
  toBottom = [],
  toTop = [],
  staticElementMoves = [],
  direction = DirectionsNavigateKeys.STATIC_MOVES,
  position = {}
}) => {
  const defaultMainPos = -(defaultPos * width);
  let interval: NodeJS.Timeout;

  const [steps, setSteps] = useState<number[]>([]);
  const [current, setCurrent] = useState<number>(defaultMainPos);

  const configureAnimation = (values: number[]) => {
    const stepsPos = values.map((item: number) => -(item * width));
    setSteps(stepsPos);
  };

  const changeDirection = {
    [DirectionsNavigateKeys.LEFT]: () => configureAnimation(toLeft),
    [DirectionsNavigateKeys.RIGHT]: () => {
      configureAnimation(toRight);
    },
    [DirectionsNavigateKeys.UP]: () => configureAnimation(toTop),
    [DirectionsNavigateKeys.DOWN]: () => configureAnimation(toBottom),
    [DirectionsNavigateKeys.STATIC_MOVES]: () => configureAnimation(staticElementMoves),
  };

  useLayoutEffect(() => {
    changeDirection[direction]();
  }, [direction]);

  useLayoutEffect(() => {
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
    <div className={styles.char} style={{ width, height, ...position }} id={id} data-testid={id}>
      <div
        className={styles.char__container}
        style={{ left: current ?? defaultMainPos }}
      >
        <img alt={"main char"} src={sprite} />
      </div>
    </div>
  );
};

export default AnimatedSprite;

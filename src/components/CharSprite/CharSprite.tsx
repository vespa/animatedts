import { useEffect, useState } from "react";
import styles from "./CharSprite.module.scss";
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
  /** src for sprite image */
  toLeft: number[];
}

export const CharSprite: React.FC<CharSpriteProps> = ({
  defaultPos = 0,
  running = false,
  width,
  height,
  sprite,
  toLeft = [],
}) => {
  const defaultMainPos = -(defaultPos * width);
  let interval: NodeJS.Timeout;
  //   const [animateFrames, setAnimateFrames] = useState(toLeft);
  const [steps, setSteps] = useState<number[]>([]);
  const [current, setCurrent] = useState<number>(defaultMainPos);

  const configureLeftAnimation = () => {
    const stepsPos = toLeft.map((item: number) => -(item * width));
    setSteps(stepsPos);
  };

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
  }, [steps, running]);

  useEffect(() => {
    configureLeftAnimation();
  }, []);
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

export default CharSprite;

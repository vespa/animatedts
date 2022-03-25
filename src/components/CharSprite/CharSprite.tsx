import { useEffect, useState } from "react";
import styles from "./CharSprite.module.scss";
interface CharSpriteProps {
  running: boolean;
  width: number;
  height: number;
  sprite: string;
  initialPos: number;
  toLeft: number[];
}

export const CharSprite: React.FC<CharSpriteProps> = ({
  running,
  width,
  height,
  sprite,
  initialPos,
  toLeft = [],
}) => {
  let interval: NodeJS.Timeout;
  //   const [animateFrames, setAnimateFrames] = useState(toLeft);
  const [steps, setSteps] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
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
    !running && clearInterval(interval);
    return () => clearInterval(interval);
  }, [steps, running]);

  useEffect(() => {
    configureLeftAnimation();
  }, []);
  return (
    <div className={styles.char} style={{ width, height }}>
      <div className={styles.char__container} style={{ left: current }}>
        <img alt={"main char"} src={sprite} />
      </div>
    </div>
  );
};

export default CharSprite;

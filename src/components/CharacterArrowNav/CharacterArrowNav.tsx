import React, { useState, useEffect, useRef } from "react";
// import { RootState } from "state/reducers";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { navigateActionCreator } from "state";
import { PositionProps } from "state/action-types";
import styles from "./CharacterArrowNav.module.scss";

import { useArrowControl } from "hooks/UseArrowControl";

interface CharacterArrowNavProps {
  id: string;
  startPosition?: {
    left: string | number;
    top: string | number;
  };
}

const posArrows: {
  [key: string]: string;
} = {
  ArrowRight: styles.char_run_right,
  ArrowLeft: styles.char_run_left,
  ArrowUp: styles.char_run_up,
  ArrowDown: styles.char_run_left,
};

export const CharacterArrowNav: React.FC<CharacterArrowNavProps> = ({
  id,
  startPosition,
}) => {
  const animationBaseTime = 1.5;
  const [move, setMove] = useState("");
  // const [timeToReachEgge, setTimeToReachEdge] = useState(animationBaseTiem);
  const keyCounterName = "data-key-counter";
  const { up, down, left, right } = useArrowControl();
  const [position, setPosition] = useState<PositionProps>();
  const [animateClassH, setAnimateClassH] = useState("");
  const dispatch = useDispatch();
  const { registerPosition } = bindActionCreators(
    navigateActionCreator,
    dispatch
  );
  // const { stage, navigate } = useSelector((state: RootState) => state);
  const elemRef = useRef(null);
  const elemCounter = useRef(null);

  
  const configureArrows = (target: HTMLDivElement, counter: HTMLDivElement) => {
    counter.setAttribute(keyCounterName, "");

    const addLastCommand = (command: string) => {
      const current = counter.getAttribute(keyCounterName);
      setMove(command);
      counter.setAttribute(keyCounterName, `${current} ${command}`);
    };

    const removeLastCommand = (command: string) => {
      const current = counter.getAttribute(keyCounterName);
      const rule = new RegExp(command, "gi");
      const classe = current?.replace(rule, "").trim();
      counter.setAttribute(keyCounterName, `${classe}`);
      return classe?.split(" ").slice(-1)[0];
    };

    const play = (classe: string, target: HTMLDivElement) => {
      target.style.animationPlayState = "pause";
      updateCurrentPosition(() => {
        target.classList.add(classe);
        target.style.animationPlayState = "running";
        setAnimateClassH(classe);
      });
    };

    const stop = (command: string) => {
      const last = removeLastCommand(command);
      target.style.animationPlayState = "paused";
      updateCurrentPosition(() => {
        setAnimateClassH("");
        if (last)
          setTimeout(() => {
            target.style.animationPlayState = "running";
            setAnimateClassH(last ? posArrows[last] : "");
          });
      });
    };
    // LEFT
    left.onPlay((e) => {
      addLastCommand(e.key);
      play(styles.char_run_left, target);
    });
    left.onStop((e) => {
      stop(e.key);
    });

    // RIGHT
    right.onStop((e) => {
      stop(e.key);
    });
    right.onPlay((e) => {
      addLastCommand(e.key);
      play(styles.char_run_right, target);
    });

    // UP
    up.onStop((e) => {
      stop(e.key);
    });
    up.onPlay((e) => {
      addLastCommand(e.key);
      play(styles.char_run_up, target);
    });

    // DOWN
    down.onStop((e) => {
      stop(e.key);
    });
    down.onPlay((e) => {
      addLastCommand(e.key);
      play(styles.char_run_down, target);
    });
  };
  const returnCurrentPosition = (elem: HTMLDivElement) => {
    const { left, top } = window.getComputedStyle(elem);
    const convertToNumber = (n: string): number =>
      Number(n.replace(/[a-zA-Z]/gi, ""));
    return {
      left: convertToNumber(left),
      top: convertToNumber(top),
    };
  };

  useEffect(() => {
    elemRef.current &&
      elemCounter.current &&
      configureArrows(elemRef.current, elemCounter.current);
  }, []);

  const updateCurrentPosition = (callbakck = Function()) => {
    setTimeout(() => {
      elemRef.current &&
        (() => {
          const obj = returnCurrentPosition(elemRef.current);
          setPosition(obj);
          setTimeout(() => {
            callbakck();
            // register last position
            registerPosition(id, obj);
          });
        })();
    });
  };

  // useEffect(() => {
  //   calcTimeToReachEdges();
  // }, [navigate[id]]);

  return (
    <>
      <div ref={elemCounter}>x </div>
      <div
        style={{
          animationDuration: `${animationBaseTime}s`,
          ...(position ? position : startPosition),
        }}
        className={`${styles.char} ${animateClassH}`}
        ref={elemRef}
      >
        {move}
      </div>
    </>
  );
};

export default CharacterArrowNav;

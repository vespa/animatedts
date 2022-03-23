import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { navigateActionCreator } from "state";
import { PositionProps } from "state/action-types";
import { RootState } from "state/reducers";
import styles from "./Character.module.scss";

import { useArrowControl } from "hooks/UseArrowControl";

interface CharacterProps {
  id: string;
  startPosition?: {
    left: string | number;
    top: string | number;
  };
}

export const Character: React.FC<CharacterProps> = ({ id, startPosition }) => {
  const { up, down, left, right } = useArrowControl();
  const [position, setPosition] = useState<PositionProps>();
  const [animateClass, setAnimateClass] = useState("");
  const dispatch = useDispatch();
  const { moveFixed } = bindActionCreators(navigateActionCreator, dispatch);
  const elemRef = useRef(null);
  const elemCounter = useRef(null);

  const configureArrows = (target: HTMLDivElement, counter: HTMLDivElement) => {
    const keyCounterName = "data-key-counter";
    counter.setAttribute(keyCounterName, "");
    const posArrows: {
      [key: string]: string;
    } = {
      ArrowRight: styles.char_run_right,
      ArrowLeft: styles.char_run_left,
      ArrowUp: styles.char_run_up,
      ArrowDown: styles.char_run_left,
    };

    const addLastCommand = (command: string) => {
      const current = counter.getAttribute(keyCounterName);
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
        setAnimateClass(classe);
      });
    };

    const stop = (command: string) => {
      const last = removeLastCommand(command);
      target.style.animationPlayState = "paused";
      updateCurrentPosition(() => {
        setAnimateClass("");
        if (last)
          setTimeout(() => {
            target.style.animationPlayState = "running";
            setAnimateClass(last ? posArrows[last] : "");
          });
      });
    };

    left.onPlay((e) => {
      addLastCommand(e.key);
      play(styles.char_run_left, target);
    });
    left.onStop((e) => {
      stop(e.key);
    });
    //
    right.onStop((e) => {
      stop(e.key);
    });

    right.onPlay((e) => {
      addLastCommand(e.key);
      play(styles.char_run_right, target);
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
            moveFixed(id, obj);
          });
        })();
    });
  };
  useEffect(() => {
    updateCurrentPosition();
  }, [startPosition]);

  return (
    <>
      <div ref={elemCounter}>x </div>
      <div
        style={{ ...(position ? position : startPosition) }}
        className={`${styles.char} ${animateClass}`}
        ref={elemRef}
      >
        {/* {keys} */}
      </div>
    </>
  );
};

export default Character;

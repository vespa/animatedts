import React, { useState, useEffect, useRef } from "react";
import { RootState } from "state/reducers";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { navigateActionCreator } from "state";
import {
  PositionProps,
  CharacterArrowNavProps,
  DirectionTypes,
  ActionNavigateType,
} from "state/action-types";
import styles from "./CharacterArrowNav.module.scss";

import { useArrowControl } from "hooks/UseArrowControl";
const posArrows: {
  [key: string]: string;
} = {
  ArrowRight: styles.char_run_right,
  ArrowLeft: styles.char_run_left,
  ArrowUp: styles.char_run_up,
  ArrowDown: styles.char_run_down,
};

export const CharacterArrowNav: React.FC<CharacterArrowNavProps> = ({
  id,
  startPosition,
  children,
  setDirection = () => false,
  setRunning = () => false,
}) => {
  const animationBaseTime = 1.5;
  const keyCounterName = "data-key-counter";
  const { up, down, left, right } = useArrowControl();
  const [position, setPosition] = useState<PositionProps>();
  const [animateClassH, setAnimateClassH] = useState("");
  const [toEdge, setToEdge] = useState(animationBaseTime / 2);
  const dispatch = useDispatch();
  const { registerPosition } = bindActionCreators(
    navigateActionCreator,
    dispatch
  );
  const { stage } = useSelector((state: RootState) => state);
  const elemRef = useRef(null);
  const elemCounter = useRef(null);

  const convertToNumber = (n: string): number =>
    Number(n.replace(/[a-zA-Z]/gi, ""));

  const calcDistanceFromEdge = (
    target: HTMLDivElement,
    key: DirectionTypes
  ) => {
    const { left, top } = window.getComputedStyle(target);
    const timeFixer = (vector: string, val: number) => {
      const time =
        ((convertToNumber(vector) * 100) / val / 100) * animationBaseTime;
      return time > 0 ? time : animationBaseTime;
    };
    const bottomCalc = convertToNumber(
      `${stage.height - convertToNumber(top)}`
    );
    const rightCalc = convertToNumber(`${stage.width - convertToNumber(left)}`);
    const timeToReach: {
      [key: string]: number;
    } = {
      [ActionNavigateType.ArrowLeft]: timeFixer(left, stage.width),
      [ActionNavigateType.ArrowRight]: timeFixer(`${rightCalc}`, stage.width),
      [ActionNavigateType.ArrowUp]: timeFixer(top, stage.height),
      [ActionNavigateType.ArrowDown]: timeFixer(`${bottomCalc}`, stage.height),
    };
    setToEdge(timeToReach[key]);
  };
  const configureArrows = (target: HTMLDivElement, counter: HTMLDivElement) => {
    counter.setAttribute(keyCounterName, "");

    const addLastCommand = (command: DirectionTypes) => {
      const current = counter.getAttribute(keyCounterName);
      setDirection(command);
      counter.setAttribute(keyCounterName, `${current} ${command}`);
    };

    const removeLastCommand = (command: string) => {
      const current = counter.getAttribute(keyCounterName);
      const rule = new RegExp(command, "gi");
      const classe = current?.replace(rule, "").trim();
      counter.setAttribute(keyCounterName, `${classe}`);
      return classe?.split(" ").slice(-1)[0];
    };

    const play = (
      classe: string,
      target: HTMLDivElement,
      key: DirectionTypes
    ) => {
      addLastCommand(key);
      target.style.animationPlayState = "pause";
      updateCurrentPosition(() => {
        calcDistanceFromEdge(target, key);
        target.classList.add(classe);
        target.style.animationPlayState = "running";
        setAnimateClassH(classe);
        setRunning(true);
      });
    };

    const stop = (command: string) => {
      const last = removeLastCommand(command);
      target.style.animationPlayState = "paused";
      updateCurrentPosition(() => {
        setAnimateClassH("");
        if (last) {
          setTimeout(() => {
            target.style.animationPlayState = "running";
            setAnimateClassH(last ? posArrows[last] : "");
            setDirection(last as DirectionTypes);
          });
        } else {
          setRunning(false);
        }
      });
    };

    // LEFT
    left.onPlay((e) =>
      play(styles.char_run_left, target, e.key as DirectionTypes)
    );
    left.onStop((e) => stop(e.key));

    // RIGHT
    right.onStop((e) => stop(e.key));
    right.onPlay((e) =>
      play(styles.char_run_right, target, e.key as DirectionTypes)
    );

    // UP
    up.onStop((e) => stop(e.key));
    up.onPlay((e) => play(styles.char_run_up, target, e.key as DirectionTypes));

    // DOWN
    down.onStop((e) => stop(e.key));
    down.onPlay((e) =>
      play(styles.char_run_down, target, e.key as DirectionTypes)
    );
  };
  const returnCurrentPosition = (elem: HTMLDivElement) => {
    const { left, top } = window.getComputedStyle(elem);

    return {
      left: convertToNumber(left),
      top: convertToNumber(top),
    };
  };

  useEffect(() => {
    setRunning(false);
    stage.loaded &&
      elemRef.current &&
      elemCounter.current &&
      configureArrows(elemRef.current, elemCounter.current);
  }, [stage]);

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
      <div ref={elemCounter}></div>
      <div
        style={{
          animationDuration: `${toEdge}s`,
          ...(position ? position : startPosition),
        }}
        className={`${styles.char} ${animateClassH}`}
        ref={elemRef}
      >
        {children}
      </div>
    </>
  );
};

export default CharacterArrowNav;

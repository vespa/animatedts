import React, { useState, useEffect, useRef } from "react";
import { RootState } from "state/reducers";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { navigateActionCreator } from "state";
import {
  CharacterArrowNavProps,
  DirectionTypes,
  ActionNavigateType,
} from "state/action-types";
import styles from "./CharacterArrowNav.module.scss";

import { useArrowControl } from "hooks/UseArrowControl";

export const CharacterArrowNav: React.FC<CharacterArrowNavProps> = ({
  id,
  startPosition,
  children,
  setDirection = () => false,
  setRunning = () => false,
  running = false,
}) => {
  const keyCounterName = "data-key-counter";
  const { up, down, left, right } = useArrowControl();
  const [key, setKey] = useState<DirectionTypes>(ActionNavigateType.ArrowUp);

  const dispatch = useDispatch();
  const { registerPosition, moveLeft, moveDown, moveRight, moveTop } =
    bindActionCreators(navigateActionCreator, dispatch);
  const { stage, navigate } = useSelector((state: RootState) => state);
  const elemRef = useRef(null);
  const elemCounter = useRef(null);

  const convertToNumber = (n: string): number =>
    Number(n.replace(/[a-zA-Z]/gi, ""));
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
      setKey(key);
      setRunning(true);
    };

    const stop = (command: string) => {
      const last = removeLastCommand(command);
      target.style.animationPlayState = "paused";
      if (last) {
        setKey(last as DirectionTypes);
        setTimeout(() => {
          target.style.animationPlayState = "running";
          setDirection(last as DirectionTypes);
        });
      } else {
        setRunning(false);
      }
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
    updateCurrentPosition();
  }, [stage]);

  const updateCurrentPosition = (callbakck = Function()) => {
    setTimeout(() => {
      elemRef.current &&
        (() => {
          const obj = returnCurrentPosition(elemRef.current);
          setTimeout(() => {
            callbakck();
            // register last position
            registerPosition(id, obj);
          });
        })();
    });
  };
  let myInterval: NodeJS.Timer;
  useEffect(() => {
    clearInterval(myInterval);
    running &&
      navigate[id] &&
      (() => {
        myInterval = setInterval(() => {
          const mov = 15;
          const commands = {
            [ActionNavigateType.ArrowLeft]: () => moveLeft(id, mov),
            [ActionNavigateType.ArrowUp]: () => moveTop(id, mov),
            [ActionNavigateType.ArrowDown]: () => moveDown(id, mov),
            [ActionNavigateType.ArrowRight]: () => moveRight(id, mov),
          };
          key && commands[key]();
        }, 60);
      })();

    return () => clearInterval(myInterval);
  }, [running, key]);

  return (
    <>
      <div ref={elemCounter}> </div>
      <div
        style={{
          ...(navigate[id] ? navigate[id] : startPosition),
        }}
        className={`${styles.char}`}
        ref={elemRef}
      >
        {children}
      </div>
    </>
  );
};

export default CharacterArrowNav;

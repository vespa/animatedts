import React, { useState, useEffect, useRef } from "react";
import { RootState } from "state/reducers";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { navigateActionCreator } from "state";
import {
  NavArrowsProps,
  DirectionTypes,
  DirectionsNavigateKeys,
} from "state/action-types";
import styles from "./NavArrows.module.scss";

import { useArrowControl } from "hooks/UseArrowControl";

export const NavArrows: React.FC<NavArrowsProps> = ({
  id,
  startPosition,
  children,
  setDirection = () => false,
  setRunning = () => false,
  running = false,
}) => {
  const keyCounterName = "data-key-counter";
  const { up, down, left, right } = useArrowControl();
  const [key, setKey] = useState<DirectionTypes>(DirectionsNavigateKeys.UP);

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
      play(e.key as DirectionTypes)
    );
    left.onStop((e) => stop(e.key));

    // RIGHT
    right.onStop((e) => stop(e.key));
    right.onPlay((e) =>
      play(e.key as DirectionTypes)
    );

    // UP
    up.onStop((e) => stop(e.key));
    up.onPlay((e) => play(e.key as DirectionTypes));

    // DOWN
    down.onStop((e) => stop(e.key));
    down.onPlay((e) =>
      play(e.key as DirectionTypes)
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
            registerPosition(id, obj);
          });
        })();
    });
  };
  let myInterval: NodeJS.Timer;
  const movementControls = (target: HTMLDivElement) => {
    const mov = 15;
    const posX = convertToNumber(target.style.left)
    const posY = convertToNumber(target.style.top)
    const commands = {
      [DirectionsNavigateKeys.LEFT]: () => moveLeft(id, posX <= 0 ? -mov : mov),
      [DirectionsNavigateKeys.RIGHT]: () => moveRight(id, posX <= stage.width ? mov : -mov),
      [DirectionsNavigateKeys.UP]: () => moveTop(id, posY <= 0 ? -mov : mov),
      [DirectionsNavigateKeys.DOWN]: () => moveDown(id, posY <= stage.height ? mov : -mov),
      [DirectionsNavigateKeys.STATIC_MOVES]: () => moveDown(id, posY <= stage.height ? mov : -mov),
    };
    key && commands[key]();
  }
  useEffect(() => {
    clearInterval(myInterval);

    running &&
      navigate[id] &&
      elemRef.current &&
      (() => {
        myInterval = setInterval(() => {
          elemRef.current && movementControls(elemRef.current);
        }, 60);
      })();

    return () => clearInterval(myInterval);
  }, [running, key]);

  return (
    <>
      <div ref={elemCounter}></div>
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

export default NavArrows;

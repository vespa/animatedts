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
  const { navigate, stage } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { moveFixed } = bindActionCreators(navigateActionCreator, dispatch);

  const elemRef = useRef(null);

  // const restrictElementToStage = () => {
  //   const margin = 60;
  //   const char: PositionProps = navigate[id];
  //   const checkPos: PositionProps = {
  //     left:
  //       char.left < 0
  //         ? margin
  //         : char.left > stage.width
  //         ? stage.width - margin
  //         : char.left,
  //     top:
  //       char.top < 0
  //         ? margin
  //         : char.top > stage.height
  //         ? stage.height - margin
  //         : char.top,
  //   };
  //   const validateProps = {
  //     left: !(char.left < 0 || char.left > stage.width),
  //     top: !(char.top < 0 || char.top > stage.height),
  //   };

  //   return {
  //     valid: validateProps.left && validateProps.top,
  //     ...checkPos,
  //   };
  // };
  let keyCount = 0;
  const play = (classe: string, target: HTMLDivElement) => {
    keyCount++;
    target.style.animationPlayState = "pause";
    updateCurrentPosition(() => {
      target.classList.add(classe);
      target.style.animationPlayState = "running";
      setAnimateClass(classe);
    });
  };

  const configureArrows = (target: HTMLDivElement) => {
    const stop = () => {
      keyCount++;
      target.style.animationPlayState = "paused";
      updateCurrentPosition(() => {
        setAnimateClass("");
      });
    };

    left.onPlay(() => {
      play(styles.char_run_left, target);
    });
    left.onStop((e) => {
      console.log(e);
      stop();
    });
    //
    right.onStop(() => {
      stop();
    });

    right.onPlay(() => {
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
  // calculate current pos
  // useEffect(() => {
  //   navigate[id] &&
  //     (() => {
  //       const check = restrictElementToStage();
  //       check.valid && setPosition(navigate[id]);
  //       !check.valid && moveFixed(id, { ...check });
  //     })();
  // }, [navigate[id]]);

  useEffect(() => {
    elemRef.current && configureArrows(elemRef.current);
  }, []);

  const updateCurrentPosition = (callbakck = Function()) => {
    setTimeout(() => {
      elemRef.current &&
        (() => {
          const obj = returnCurrentPosition(elemRef.current);
          moveFixed(id, obj);
          setPosition(obj);
          setTimeout(() => {
            callbakck();
          });
        })();
    });
  };
  useEffect(() => {
    updateCurrentPosition();
  }, [startPosition]);

  return (
    <div
      style={{ ...(position ? position : startPosition) }}
      className={`${styles.char} ${animateClass}`}
      ref={elemRef}
    >
      {keyCount}
    </div>
  );
};

export default Character;

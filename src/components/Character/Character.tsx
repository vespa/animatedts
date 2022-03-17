import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { navigateActionCreator } from "state";
import { PositionProps } from "state/action-types";
import { RootState } from "state/reducers";
import styles from "./Character.module.scss";
interface CharacterProps {
  id: string;
  startPosition?: {
    left: string | number;
    top: string | number;
  };
}

export const Character: React.FC<CharacterProps> = ({ id, startPosition }) => {
  const [postion, setPosition] = useState<object>(startPosition || {});
  const { navigate, stage } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { moveFixed } = bindActionCreators(navigateActionCreator, dispatch);
  const elemRef = useRef(null);

  const restrictElementToStage = () => {
    const margin = 60;
    const char: PositionProps = navigate[id];
    const checkPos: PositionProps = {
      left:
        char.left < 0
          ? margin
          : char.left > stage.width
          ? stage.width - margin
          : char.left,
      top:
        char.top < 0
          ? margin
          : char.top > stage.height
          ? stage.height - margin
          : char.top,
    };
    const validateProps = {
      left: !(char.left < 0 || char.left > stage.width),
      top: !(char.top < 0 || char.top > stage.height),
    };
    console.log(validateProps);
    return {
      valid: validateProps.left && validateProps.top,
      ...checkPos,
    };
  };
  // calculate current pos
  useEffect(() => {
    navigate[id] &&
      (() => {
        const check = restrictElementToStage();
        check.valid && setPosition(navigate[id]);
        !check.valid && moveFixed(id, { ...check });
      })();
  }, [navigate[id]]);

  useEffect(() => {
    setTimeout(() => {
      elemRef.current &&
        (() => {
          const { left, top } = window.getComputedStyle(elemRef.current);
          const convertToNumber = (n: string): number =>
            Number(n.replace(/[a-zA-Z]/gi, ""));
          const obj = {
            left: convertToNumber(left),
            top: convertToNumber(top),
          };
          moveFixed(id, obj);
        })();
    }, 100);
  }, [startPosition]);

  return (
    <div style={{ ...postion }} className={styles.char} ref={elemRef}>
      test
    </div>
  );
};

export default Character;

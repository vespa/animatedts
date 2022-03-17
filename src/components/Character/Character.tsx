import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { navigateActionCreator } from "state";
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
  const navigate = useSelector((state: RootState) => state.navigate);
  const dispatch = useDispatch();
  const { moveFixed } = bindActionCreators(navigateActionCreator, dispatch);
  const elemRef = useRef(null);
  const convertNavigateToPX = () => {
    const convertPos = Object.entries(navigate[id]).map(([key, value]) => {
      return { [key]: `${value}px` };
    });
    return Object.assign({}, ...convertPos);
  };

  useEffect(() => {
    navigate[id] && setPosition(convertNavigateToPX());
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

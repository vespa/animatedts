import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { navigateActionCreator } from "state";
import { RootState } from "state/reducers";
import styles from "./Character.module.scss";
// import { PositionProps } from "state/action-types";

interface CharacterProps {
  //   navigate: PositionProps;
  startPosition?: {
    left: string | number;
    top: string | number;
  };
}

export const Character: React.FC<CharacterProps> = ({
  //   navigate,
  startPosition,
}) => {
  const [postion, setPosition] = useState({});
  const navigate = useSelector((state: RootState) => state.navigate);
  const dispatch = useDispatch();
  const { moveFixed } = bindActionCreators(navigateActionCreator, dispatch);
  const elemRef = useRef(null);
  const [firstRun, setFirstRun] = useState<boolean>(true);

  const convertNavigateToPX = () => {
    const convertPos = Object.entries(navigate).map(([key, value]) => {
      return { [key]: `${value}px` };
    });
    return firstRun && startPosition
      ? startPosition
      : Object.assign({}, ...convertPos);
  };

  useEffect(() => {
    setPosition(convertNavigateToPX());
    // setPosition(navigate);
  }, [navigate]);
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
          moveFixed(obj);
          setTimeout(() => {
            setFirstRun(false);
          });
        })();
    }, 100);
  }, []);

  return (
    <div style={{ ...postion }} className={styles.char} ref={elemRef}>
      test
    </div>
  );
};

export default Character;

import React, { ReactChild, ReactNode, useEffect, useRef } from "react";
import styles from "./Stage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { stageActionCreator } from "state";
import { RootState } from "state/reducers";
import { StateStageProps } from "state/action-types";
interface StageProps {
  children: ReactChild | ReactNode;
  size: StateStageProps;
}

export const Stage: React.FC<StageProps> = ({ children, size }) => {
  const ref = useRef(null)
  const stageProps = useSelector((state: RootState) => state.stage);
  const dispatch = useDispatch();
  const { setStageSize } = bindActionCreators(stageActionCreator, dispatch);

  useEffect(() => {
    ref.current && setStageSize({
      ...size,
      loaded: true,
      stage: ref.current
    });
  }, [ref]);
  return (
    <div className={styles.stage} style={{ ...stageProps }} ref={ref}>
      {children}
    </div>
  );
};

export default Stage;

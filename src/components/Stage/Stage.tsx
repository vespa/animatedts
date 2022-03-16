import React, { ReactChild, ReactNode } from "react";
import styles from "./Stage.module.scss";

export const Stage = ({ children }: { children: ReactChild | ReactNode }) => {
  return <div className={styles.stage}> {children} </div>;
};

export default Stage;

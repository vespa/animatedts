import React, { ReactChild } from "react";
import styles from "./Stage.module.scss";

export const Stage = ({ children }: { children: ReactChild }) => {
  return <div className={styles.stage}> {children} </div>;
};

export default Stage;

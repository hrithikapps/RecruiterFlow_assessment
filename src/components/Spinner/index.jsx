import React from "react";
import styles from "./style.module.css";

const Spinner = ({ text = "Loading..." }) => {
  return (
    <div className={styles.loader}>
      <div className={styles.spin} />
      <span className={styles.loader_text}>{text}</span>
    </div>
  );
};

export default Spinner;

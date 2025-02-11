import React from "react";
import styles from "./style.module.css";

const MessageBox = ({ message }) => {
  return <div className={styles.root}>{message}</div>;
};

export default MessageBox;

// import React from "react";
import styles from "./DayoffList.module.scss";

export default function DayoffList() {
  return (
    <li className={styles.list}>
      <span className={styles.list_option}>
        <span className={`${styles.text} ${styles.name}`}>이름</span>
        <span className={`${styles.text} ${styles.title}`}>제목</span>
        <span className={`${styles.text} ${styles.period}`}>
          2023 / 7 / 29 ~ 2023 / 7 / 30
        </span>
        <span className={`${styles.text} ${styles.count}`}>2개</span>
      </span>
      <button className={styles.permission}>결재 대기</button>
    </li>
  );
}

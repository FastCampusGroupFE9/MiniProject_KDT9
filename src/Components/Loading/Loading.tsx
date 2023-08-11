import styles from "./SearchBar.module.scss";
// import Spinner from "../../assets/Loading_Ellipsis.gif";

export default function Loading() {
  return (
    <div className={styles.loading_BG}>
      <span className={styles.loading_text}>로딩 중...</span>
      <img
        className={styles.loading_img}
        src="../../assets/Loading_Ellipsis.gif"
        alt="search icon"
      />
    </div>
  );
}

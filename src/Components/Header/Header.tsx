import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  // 로그인 처리 api
  const mainNav = () => {
    navigate("/main");
  };

  return (
    <div className={styles.header}>
      <a className={styles.title} onClick={mainNav}>
        TimeSync
      </a>
    </div>
  );
}

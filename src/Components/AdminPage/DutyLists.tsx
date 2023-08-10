import styles from "./DutyLists.module.scss";
import { useState } from "react";
import { permission } from "@/Api/apis";

interface Props {
  item: AdminListsAll;
}

export default function DutyLists({ item }: Props) {
  const [status, setStatus] = useState(item.status);

  // useEffect(() => {
  //   setStatus(item.status);
  //   console.log("동작을 하는가:", '당직');
  // }, [item.status]);

  const handlePermissionClick = async () => {
    if (status === "결재 대기") {
      try {
        const response = await permission(item);
        if (response && response.data) {
          setStatus("결재 완료");
        }
      } catch (error) {
        console.error("결재 승인 중 오류 발생:", error);
      }
    }
  };

  return (
    <li key={item.id} className={styles.list}>
      <span className={styles.list_option}>
        <span className={`${styles.text} ${styles.name}`}>{item.name}</span>
        <span className={`${styles.text} ${styles.title}`}>{item.title}.</span>
        <span className={`${styles.text} ${styles.period}`}>
          {item.startDate}
        </span>
      </span>
      <button
        className={`${styles.permission} ${
          status === "결재 완료" ? styles.checked : ""
        }`}
        onClick={handlePermissionClick}
        disabled={status === "결재 완료"}
      >
        {item.status}
      </button>
    </li>
  );
}

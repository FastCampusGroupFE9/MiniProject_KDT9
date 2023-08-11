import { useState } from "react";
import useDataQuery from "@/Hooks/useData-Query";
import styles from "./DayoffLists.module.scss";
import { AxiosResponse } from "axios";

interface AdminListsAll {
  id: number;
  status: string;
  startDate: string;
  endDate: string;
  name: string;
  title: string;
  reason?: string;
  category: any;
}

interface Props {
  item: AdminListsAll;
}


export default function DayoffLists({ item }: Props) {
  const [status, setStatus] = useState<string>(item.status);
  const { changeAdminData } = useDataQuery();
  const calculateUsedDays = (): number => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const usedDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    return usedDays;
  };

  const handlePermissionClick = async (): Promise<void> => {
    if (status === "결재 대기") {
      try {
        const res: AxiosResponse = await changeAdminData.mutateAsync(item);
        if (res && res.data) {
          setStatus("결재완료");
        }
      } catch (error) {
        console.error("결재 승인 중 오류", error);
      }
    }
  };

  return (
    <li key={item.id} className={styles.list}>
      <span className={styles.list_option}>
        <span className={`${styles.text} ${styles.name}`}>{item.name}</span>
        <span className={`${styles.text} ${styles.title}`}>{item.title}</span>
        <span className={`${styles.text} ${styles.reason}`}>{item.reason}</span>
        <span className={`${styles.text} ${styles.period}`}>
          {item.startDate} - {item.endDate}
        </span>
        <span className={`${styles.text} ${styles.count}`}>
          {calculateUsedDays()}일
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

import styles from "./DayoffLists.module.scss";
import { useState, } from "react";
// import { AdminListsAll } from "@/@types/adminList.ts";
// import { permission } from "@/Api/apis.ts";
import useDataQuery from "@/Hooks/useData-Query.tsx";

interface Props {
  item: AdminListsAll;
}

export default function DayoffLists({ item }: Props) {
  const [status, setStatus] = useState(item.status);
  const {changeAdminData} = useDataQuery()
  console.log(status);

  // useEffect(() => {
  //   setStatus(item.status);
  //   console.log("동작을 하는가 :", "연차");
  // }, [status]);

  const calculateUsedDays = () => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const usedDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // 1을 더하여 마지막 날을 포함
    return usedDays;
  };

  const handlePermissionClick = async () => {
    if (status === "결재 대기") {
      changeAdminData.mutate(item,{
        onSuccess: (res:any) => {
          if (res && res.data) {
            setStatus("결재완료");
          }
        },
        onError: (error) => {
          console.error("결재 승인 중 오류", error);
        }
      })
      // try {
      //   const response = await permission(item);
      //   if (response && response.data) {
      //     setStatus("결재 완료");
      //   }
      // } catch (error) {
      //   console.error("결재 승인 중 오류 발생:", error);
      // }
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

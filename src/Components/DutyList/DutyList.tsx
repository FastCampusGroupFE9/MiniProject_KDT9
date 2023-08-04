import { useMyStore } from "@/Store/store.ts";
import styles from "@/Components/DutyList/dutyList.module.scss";

export default function DutyList({ name }: { name: string }) {
  const user = useMyStore((state) =>
    state.data.find((user) => user.name === name),
  );
  return (
    <div className={styles.container}>
      <div className={styles.index}>
        <p className={styles.index_title}>사유</p>
        <p className={styles.index_title}>제목</p>
        <p className={styles.index_title}>사용 날짜</p>
        <p className={styles.index_title}>상태</p>
      </div>
      <div className={styles.lists_content}>
        {user?.duty.map((dutyItem: DutyType) => (
          <div key={dutyItem.id} className={styles.lists}>
            <div className={styles.list}>당직</div> 
            <div className={styles.list}>{dutyItem.title}</div>
            <div className={styles.list}>{dutyItem.startDate}</div>
            <div className={styles.list}>{dutyItem.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

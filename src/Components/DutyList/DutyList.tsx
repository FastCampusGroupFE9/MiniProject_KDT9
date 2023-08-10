import styles from "@/Components/DutyList/dutyList.module.scss";
import { useState } from "react";
import DutyModal from "@/Components/DutyList/DutyModal.tsx";

export default function DutyList(props:{myData?:MyDataType}) {

  const [id, setId] = useState(0);
  const [duty, setDuty] = useState<DutyType|undefined>();
  const [visivility, setVisivility] = useState(false)
  const dutyDatas = props.myData?.dutyHistories || [];

  const handleClick = (id: number) => {
    setId(id);
    const temp = dutyDatas.find((duty) => duty.id === id);
    console.log(temp);
    setVisivility(true);
    setDuty(temp);
  };
  return (
    <div className={styles.container}>
      <div className={styles.index}>
        <p className={styles.index_title}>사유</p>
        <p className={styles.index_title}>제목</p>
        <p className={styles.index_title}>사용 날짜</p>
        <p className={styles.index_title}>상태</p>
      </div>
      <div className={styles.lists_content}>
        {dutyDatas?.map((dutyItem, index) => (
          <div
            onClick={() => handleClick(dutyItem.id)}
            key={index}
            className={styles.lists}>
            <div>당직</div> 
            <div>{dutyItem.title}</div>
            <div>{dutyItem.startDate}</div>
            <div>{dutyItem.status}</div>
            <DutyModal id={id} duty={duty} visivility={visivility} setVisivility={setVisivility} />
          </div>
        ))}
      </div>
    </div>
  );
}

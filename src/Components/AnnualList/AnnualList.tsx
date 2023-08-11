import dayjs from "dayjs";
import styles from "./annualList.module.scss";
import { DateCount } from "@/Common/CommonFunction.ts";
import { useState } from "react";
import AnnualModal from "@/Components/AnnualList/AnnualModal.tsx";
import { AnnualType, MyDataType } from "types/common";

export default function AnnualList(props: { myData?: MyDataType }) {

  const [id, setId] = useState(0);
  const [annualData, setAnnualData] = useState<AnnualType>();
  const [visivility, setVisivility] = useState(false)
  const annuals = props.myData?.annualHistories || [];

  const handleClick = (id: number) => {
    setId(id);
    const temp = annuals.find((annual) => annual.id === id);
    console.log(temp);

    if (temp?.status === "결재 완료") {
      alert("결재 완료된 항목은 수정할 수 없습니다.");
    } else {
      setAnnualData(temp);
      setVisivility(true);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.index}>
        <span className={styles.index_title}>사유</span>
        <span className={styles.index_title}>제목</span>
        <span className={styles.index_title}>사용 기간</span>
        <span className={styles.index_title}>사용 개수</span>
        <span className={styles.index_title}>상태</span>
      </div>
      <div className={styles.lists_content}>
        {annuals?.map((annual, index) => (
          <div
            onClick={() => handleClick(annual.id)}
            key={index}
            className={styles.lists}
          >
            <div>{annual.reason}</div>
            <div>{annual.title}</div>
            <div>
              <span>{dayjs(annual.startDate).format("YYYY/MM/DD")}</span>~
              <span>{dayjs(annual.endDate).format("YYYY/MM/DD")}</span>
            </div>
            <div>
              {DateCount({
                startDate: annual.startDate,
                endDate: annual.endDate,
              })}{" "}
              개
            </div>
            <p>{annual.status}</p>
            <AnnualModal id={id} annual={annualData} visivility={visivility} setVisivility={setVisivility} />
          </div>
        ))}
      </div>
    </div>
  );
}

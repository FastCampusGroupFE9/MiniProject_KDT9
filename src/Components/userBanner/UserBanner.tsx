// import { DateCount, JickCounter } from "@/Common/CommonFunction.ts";
// import { useAnnualStore, useUserStore } from "@/Store/store.ts";
// import dayjs from "dayjs";
import styles from "./userBanner.module.scss";


export default function UserBanner(props:{myData:MyDataType|undefined}) {
  const myData = props.myData;
  console.log(myData);

  return (
    <div className={styles.container}>
      <div className={styles.my_menu}>
        <span >상신 내역</span>
        <span className={styles.bar}>|</span>
        <span className={styles.my_profile}>개인정보 수정</span>
      </div>
      <div className={styles.banner}>
        <div className={`${styles.banner_box} ${styles.annual_info}`}>
          <p className={styles.user_info}>
            <span className={styles.user_name}>{myData?.name} </span>
            <span className={styles.user_position}>{myData?.position}</span>
          </p>
          <span className={styles.user_text}>KDT-5 회원정보</span>
        </div>
        <div className={`${styles.banner_box} `}>
          <p>
            <span className={styles.total_num}>{myData?.annualBalance}</span>
            <span>개</span>
          </p>
          <span className={styles.total_text}>총 발생 연차</span>
        </div>
        <div className={`${styles.banner_box}`}>
          <p>
            <span className={styles.total_num}>{myData?.annualUsed}</span>
            <span>개</span>
          </p>
          <span className={styles.total_text}>총 사용 연차</span>
        </div>
        <div className={`${styles.banner_box} `}>
          <p>
            <span className={styles.total_num}>{myData?.annualRemain}</span>
            <span>개</span>
          </p>
          <span className={styles.total_text}>총 잔여 연차</span>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import styles from "./admin.module.scss";
import Header from "@/Components/Header/Header.tsx";
import SearchBar from "@/Components/AdminPage/SearchBar.tsx";
import DutyLists from "@/Components/AdminPage/DutyLists.tsx";
import DayoffLists from "@/Components/AdminPage/DayoffLists.tsx";
import { getAccessToken, getListAll, getSilentAxios } from "../../Api/apis"
import { AdminListsAll } from "types/common";

export default function Admin() {
  const [dayoffData, setDayoffData] = useState<AdminListsAll[]>([]);
  const [dutyData, setDutyData] = useState<AdminListsAll[]>([]);
  const [filteredDayoffData, setFilteredDayoffData] = useState<AdminListsAll[]>(
    [],
  );
  const [filteredDutyData, setFilteredDutyData] = useState<AdminListsAll[]>([]);
  const [searchOption, setSearchOption] = useState("이름");
  console.log(searchOption);
  // 사용자 기안 데이터 불러오기

  useEffect(() => {
    async function fetchListData() {
      try {
        const data = await getListAll();
        const dayoffItems = data.filter(
          (item: AdminListsAll) => item.category === "연차",
        );
        const dutyItems = data.filter(
          (item: AdminListsAll) => item.category === "당직",
        );

        setDayoffData(dayoffItems);
        setDutyData(dutyItems);
        setFilteredDayoffData(dayoffItems);
        setFilteredDutyData(dutyItems);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        const ACCESSTOKEN = getAccessToken();
        const silentAxios = getSilentAxios(ACCESSTOKEN ?? "");
        const result = await silentAxios.get("/admin");
        return result.data;
      }
    }
    fetchListData();
  }, []);

  // 검색 기능 추가 (옵션 선택)

  const handleSearch = (searchTerm: string, option: string) => {
    setSearchOption(option);
    if (option === "이름") {
      const filteredDayoff = dayoffData.filter((item) =>
        item.name.includes(searchTerm),
      );
      const filteredDuty = dutyData.filter((item) =>
        item.name.includes(searchTerm),
      );
      setFilteredDayoffData(filteredDayoff);
      setFilteredDutyData(filteredDuty);
    } else if (option === "제목") {
      const filteredDayoff = dayoffData.filter((item) =>
        item.title.includes(searchTerm),
      );
      const filteredDuty = dutyData.filter((item) =>
        item.title.includes(searchTerm),
      );
      setFilteredDayoffData(filteredDayoff);
      setFilteredDutyData(filteredDuty);
    }
  };

  return (
    <>
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <header className={styles.admin_info}>
            <div className={styles.admin_name}>
              <span className={styles.admin_id}>team9</span>
              <span>관리자</span>
            </div>
            <div className={styles.search_box}>
              <SearchBar onSearch={handleSearch} />
            </div>
          </header>
          <div className={styles.list_info}>
            <section className={styles.lists_box}>
              <div className={styles.lists_title}>연차 내역</div>
              <div className={styles.lists_index}>
                <span className={styles.name}>상신인</span>
                <span className={styles.title}>제목</span>
                <span className={styles.reason}>사유</span>
                <span className={styles.period}>사용 기간</span>
                <span className={styles.count}>사용 일수</span>
                <span className={styles.permission}>상태</span>
              </div>
              <ul className={styles.lists}>
                {filteredDayoffData.map((item) => (
                  <DayoffLists key={item.id} item={item} />
                ))}
              </ul>
            </section>
            <section className={`${styles.lists_box} ${styles.duty_box}`}>
              <div className={styles.lists_title}>당직 내역</div>
              <div className={styles.lists_index}>
                <span className={styles.duty_name}>상신인</span>
                <span className={styles.duty_title}>제목</span>
                <span className={styles.duty_period}>사용 기간</span>
                <span className={styles.duty_permission}>상태</span>
              </div>
              <ul className={styles.lists}>
                {filteredDutyData.map((item) => (
                  <DutyLists key={item.id} item={item} />
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
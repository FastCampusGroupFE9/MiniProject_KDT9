import dayjs from "dayjs";
import styles from "./annualList.module.scss";
import { DateCount } from "@/Common/CommonFunction.ts";
import { ChangeEvent, useState } from "react";
import Modal from "@/Components/Modal/Modal";
import { postDelete, postUpdate } from "@/Api/apis.ts";

export default function AnnualList(props: { myData?: MyDataType }) {
  const [visibility, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");
  const [id, setId] = useState(0);
  const annuals = props.myData?.annualHistories || [];

  const closeModal = () => {
    setVisible(!visibility);
  };
  const handleClick = (id: number) => {
    setVisible(true);
    setId(id)
  };
  const handleEditClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setEdit(true);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "startDate") {
      setStart(e.target.value);
    } else if (e.target.name === "endDate") {
      setEnd(e.target.value);
    } else if (e.target.name === "select-reason") {
      setReason(e.target.value);
    }
  };
  const handleSubmit = async () => {
    const data: UpdateType = { id: id, title:title, startDate: start, endDate: end, reason:reason };
    console.log(data);
    // await postUpdate(id,title,start,end,reason)
    await postUpdate(data)
      .then((res) => console.log(res));
    setEdit(false);
    setVisible(false);
  };

  const handleDelete = async () =>{
    console.log(id);
    await postDelete( id )
    .then((res) => console.log(res));
    setEdit(false);
    setVisible(false);
  }

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
            <div className={styles.list}>{annual.reason}</div>
            <div className={styles.list}>{annual.title}</div>
            <div className={styles.list}>
              <span>{dayjs(annual.startDate).format("YYYY/MM/DD")}</span>~
              <span>{dayjs(annual.endDate).format("YYYY/MM/DD")}</span>
            </div>
            <div className={styles.list}>{DateCount({
              startDate: annual.startDate,
              endDate: annual.endDate
            })} 개
            </div>
            <p className={styles.list}>{annual.status}</p>
            <Modal
              visibility={visibility} toggle={setVisible}>
              <div className="addEvent-wrap">
                <h1 className="addEvent-header">일정 등록</h1>
                <div className="addEvent-title">
                  <label>제목</label>
                  {edit ? (
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onClick={handleEditClick}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span onClick={handleEdit}>{annual.title}</span>
                  )}
                </div>
                <div className="addEvent-start">
                  <label>시작일</label>
                  {edit ? (
                    <input
                      type="date"
                      name="startDate"
                      value={start}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span onClick={handleEdit}>{annual.startDate}</span>
                  )}
                </div>
                <div className="addEvent-end">
                  <label>종료일</label>
                  {edit ? (
                    <input
                      type="date"
                      name="endDate"
                      value={end}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span onClick={handleEdit}>{annual.endDate}</span>
                  )}
                </div>
                <div className="addEvent-reason">
                  <label>사유</label>
                  {edit ? (
                    <select
                      name="select-reason" id="reason"
                      onChange={handleInputChange}
                    >
                      <option value={""}>========== 선택하세요 ==========</option>
                      <option value="연차유급휴가">연차유급휴가</option>
                      <option value="병가휴가">병가휴가</option>
                      <option value="경조사휴가">경조사휴가</option>
                      <option value="출산전후휴가">출산전휴휴가</option>
                      <option value="기타휴가">기타휴가</option>
                      <option value={reason} selected>{reason}</option>
                    </select>
                  ) : (
                    <option value={annual.reason} selected>{annual.reason}</option>
                  )
                  }
                </div>
                <div className="btn-group">
                  <button onClick={closeModal}>닫 기</button>
                  <button onClick={handleDelete}>삭 제</button>
                  <button onClick={handleSubmit}>수 정</button>
                </div>
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}


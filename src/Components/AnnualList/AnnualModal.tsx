import Modal from "@/Components/Modal/Modal.tsx";
import { ChangeEvent, useState } from "react";
import useDataQuery from "@/Hooks/useData-Query.tsx";


export default function AnnualModal(props: {
  annual?: AnnualType,
  id: number,
  visivility: boolean,
  setVisivility: (value: boolean) => void
}) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");
  const annual = props.annual;
  const id = props.id;
  const visivility = props.visivility;
  const setVisivility = props.setVisivility;
  console.log(visivility);

  const { changeMyData, deleteMyData } = useDataQuery();

  const handleEditClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setEdit(true);
    // setVisivility(true);
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
    const data: UpdateType = { id: id, title: title, startDate: start, endDate: end, reason: reason };
    changeMyData.mutate(data, {
      onSuccess: () => {
        console.log("수정되었습니다.");
        setEdit(false);
        setVisivility(false);
      },
      onError: (error: any) => {
        console.log("수정 실패", error);
      }
    });
  };

  const handleDelete = async () => {
    deleteMyData.mutate(id, {
      onSuccess: (res: any) => {
        res.status === 200 && alert("삭제되었습니다.");
        setEdit(false);
        setVisivility(false);
      },
      onError: (error: any) => {
        console.log("에러", error.response.status);
        if (error.response.status === 400) {
          alert("결재된 연차/당직은 삭제가 안됩니다.");
          setEdit(false);
          setVisivility(false);
        }
        console.log("삭제 실패");
      }
    });
  };

  return (
    <>
      <Modal visibility={visivility} toggle={setVisivility}>
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
              <span onClick={handleEdit}>{annual?.title}</span>
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
              <span onClick={handleEdit}>{annual?.startDate}</span>
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
              <span onClick={handleEdit}>{annual?.endDate}</span>
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
                <option value="출산휴가">출산휴가</option>
                <option value="기타휴가">기타휴가</option>
                <option value={reason} selected>{reason}</option>
              </select>
            ) : (
              <option value={annual?.reason} selected>{annual?.reason}</option>
            )
            }
          </div>
          <div className={"btn-group"}>
            <button onClick={handleDelete}>삭 제</button>
            <button onClick={handleSubmit}>수 정</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

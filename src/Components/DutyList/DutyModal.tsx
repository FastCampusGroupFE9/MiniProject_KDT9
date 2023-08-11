import { ChangeEvent, useState } from "react";
import useDataQuery from "@/Hooks/useData-Query.tsx";
import Modal from "@/Components/Modal/Modal.tsx";
import { DutyType, UpdateType } from "types/common";
import "./DutyModal.scss";

export default function DutyModal(props: {
  duty?: DutyType;
  id: number;
  visivility: boolean;
  setVisivility: (value: boolean) => void;
}) {
  const [edit, setEdit] = useState(true);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const { changeMyData, deleteMyData } = useDataQuery();

  const dutyItem = props.duty;
  const id = props.id;
  const visivility = props.visivility;
  const setVisivility = props.setVisivility;

  const handleEditClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setEdit(true);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "startDate") {
      setStart(e.target.value);
    }
  };
  const handleSubmit = async () => {
    const data: UpdateType = {
      id: id,
      title: title,
      startDate: start,
      endDate: start,
      reason: "기타휴가",
      message: function (): unknown {
        throw new Error("Function not implemented.");
      }
    };
    changeMyData.mutate(data, {
      onSuccess: () => {
        setEdit(false);
        setVisivility(false);
      },
    });
  };

  const handleDelete = async () => {
    deleteMyData.mutate(id, {
      onSuccess: () => {
        setEdit(false);
        setVisivility(false);
      },
    });
  };

  return (
    <>
      <Modal visibility={visivility} toggle={setVisivility}>
        <div className="custom_modal_content">
          <button className="Event_close" onClick={() => window.location.reload()}>
            <i className="fa-sharp fa-solid fa-circle-plus"></i>
          </button>
          <div className="addEvent_wrap">
            <h1 className="addEvent_header">일정 등록</h1>
            <div className="addEvent_title">
              <label className="add_title">제목</label>
              {edit ? (
                <input
                  type="text"
                  name="title"
                  value={title}
                  onClick={handleEditClick}
                  onChange={handleInputChange}
                />
              ) : (
                <span onClick={handleEdit}>{dutyItem?.title}</span>
              )}
            </div>
            <div className="addEvent_start">
              <label className="add_title">시작일</label>
              {edit ? (
                <input
                  type="date"
                  name="startDate"
                  value={start}
                  onChange={handleInputChange}
                />
              ) : (
                <span onClick={handleEdit}>{dutyItem?.startDate}</span>
              )}
            </div>
            <div className="btn_wrap">
              <button className="close_btn" onClick={handleDelete}>
                삭 제
              </button>
              <button className="submit_btn" onClick={handleSubmit}>
                수 정
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

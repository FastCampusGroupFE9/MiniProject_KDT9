import React, { useState } from "react";
import "./AddEventModal.scss";
import Modal from "react-modal";
import { postMain } from "@/Api/apis.ts";

interface AddEventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleAddEvent: (newEvent: NewEvent) => void;
}

interface NewEvent {
  title: string;
  startDate: string;
  endDate: string;
  category: string;
  reason: string;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  closeModal,
  // handleAddEvent,
}) => {
  const [events, setEvents] = useState<NewEvent[]>([]); // events 상태 변수 추가

  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: "",
    category: "",
    endDate: "",
    reason: "",
    startDate: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    // name이 'select-reason'인 경우, reason 값을 설정
    if (name === "select-reason") {
      setNewEvent((prevEvent) => ({ ...prevEvent, reason: value }));
    } else {
      setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      category: value,
      // 당직을 선택한 경우, 사유를 "기타 휴가"로 변경하고 select 요소를 해당 옵션으로 고정
      reason: value === "당직" ? "기타휴가" : prevEvent.reason,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await postMain(
        newEvent.title,
        newEvent.category,
        newEvent.endDate,
        newEvent.reason,
        newEvent.startDate,
      );

      console.log("Event successfully submitted:", response);

      // 새 이벤트를 현재 이벤트 목록에 추가하기
      setEvents([...events, newEvent]);

      // 이벤트 등록에 성공한 경우, 추가 작업을 수행하거나 사용자에게 알림을 표시할 수 있음
    } catch (error) {
      console.error("Error submitting event:", error);
      // 이벤트 등록에 실패한 경우, 에러 처리 로직을 수행하거나 사용자에게 알림을 표시할 수 있음
    }

    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Event Modal"
      overlayClassName="custom-overlay"
      className="custom-modal-content"
    >
      <div className="addEvent_wrap">
        <h1 className="addEvent_header">일정 등록</h1>
        <div className="addEvent_title">
          <label className="add_title">제목</label>
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="addEvent_start">
          <label className="add_title">시작일</label>
          <input
            type="date"
            name="startDate"
            value={newEvent.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="addEvent_end">
          <label className="add_title">종료일</label>
          <input
            type="date"
            name="endDate"
            value={newEvent.endDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="addEvent_category">
          <label className="add_title">종류</label>
          <div className="addCategory_wrap">
            <label className="add_Rest">
              <input
                type="checkbox"
                name="category"
                value="연차"
                className="input_dayoff_checkbox"
                checked={newEvent.category === "연차"}
                onChange={handleCategoryChange}
              />
              연차
            </label>
            <label className="add_Duty">
              <input
                type="checkbox"
                name="category"
                value="당직"
                className="input_duty_checkbox"
                checked={newEvent.category === "당직"}
                onChange={handleCategoryChange}
              />
              당직
            </label>
          </div>
        </div>
        <div className="addEvent_reason">
          <label className="add_title">사유</label>
          <select name="select-reason" id="reason" onChange={handleInputChange}>
            {newEvent.category === "당직" && (
              <option value="기타휴가">============= 당직 =============</option>
            )}
            {newEvent.category === "연차" && (
              <>
                <option value="">========== 선택하세요 ===========</option>
                <option value="연차유급휴가">연차 유급 휴가</option>
                <option value="병가휴가">병가 휴가</option>
                <option value="경조사휴가">경조사 휴가</option>
                <option value="출산휴가">출산 휴가</option>
                <option value="기타휴가">기타 휴가</option>
              </>
            )}
                <option value="출산휴가">출산 전휴 휴가</option>
                <option value="기타휴가">기타 휴가</option>
          </select>
        </div>
        <div className="btn_wrap">
          <button className="close_btn" onClick={closeModal}>
            닫기
          </button>
          <button className="submit_btn" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default AddEventModal;

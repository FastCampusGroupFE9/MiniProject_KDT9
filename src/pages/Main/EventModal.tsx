import React from "react";
import Modal from "react-modal";
import "./EventModal.scss";

interface EventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  event: {
    extendedProps: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _def: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _instance: any;
    reason: string;
    title: any;
    startDate: string;
    endDate: string;
    category: string;
    name: string;
  };
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  closeModal,
  event,
}) => {
  const category = event._def.extendedProps.category;
  const startDate = new Date(event._instance.range.start);
  const endDate = new Date(event._instance.range.end);

  const isDutyCategory = category === "당직";
  const isAnnualLeaveCategory = category === "연차";

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} / ${month} / ${day}`;
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Event Modal"
      overlayClassName="custom-overlay"
      className="detail-custom-modal-content"
    >
      <div className="detail_wrap">
        <h1 className="detail_header">
          <img src="/assets/calendar.png" />
          일정 상세
        </h1>
        <h2 className="detail_user">{event.extendedProps.name}</h2>
        <div className="detales detail_title">
          <span className="title">제목 :</span> {event.extendedProps.detail}
        </div>
        <div className="detales detail_date">
          <span className="title">기간 :</span> {formattedStartDate} ~{" "}
          {formattedEndDate}
        </div>
        <div className="detales detail_category">
          <span className="title">종류 :</span>
          {isDutyCategory && (
            <div className="tags detail_duty">
              <span className="tag">
                <span className="dot"></span>
                <span>당직</span>
              </span>
            </div>
          )}
          {isAnnualLeaveCategory && (
            <div className="tags detail_rest">
              <span className="tag">
                <span className="dot"></span>
                <span>연차</span>
              </span>
            </div>
          )}
          {isDutyCategory ? null : (
            <div className="detail_reason">{event.extendedProps.reason}</div>
          )}
        </div>
        <button className="detail_close" onClick={closeModal}>
          <i className="fa-sharp fa-solid fa-circle-plus"></i>
        </button>
      </div>
    </Modal>
  );
};

export default EventModal;

import React, { useState } from "react";
import { logOut } from "../../Api/apis";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();
  const [, , removeCookies] = useCookies();

  const handleLogout = async (): Promise<void> => {
    try {
      const res = await logOut();
      if (res) {
        localStorage.removeItem("role");
        removeCookies("accessToken");
        setShowConfirmModal(false);

        alert("로그아웃 되었습니다.");
        navigate("/");
        window.location.reload();
      }
    } catch (error: any) {
      console.error("로그아웃이 실패 하였습니다.", error);
    }
  };

  const handleClickLogout = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmLogout = () => {
    setShowConfirmModal(false);
    handleLogout();
  };

  const handleCancelLogout = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <li onClick={handleClickLogout}>로그아웃</li>
      {showConfirmModal && (
        <div className="logout-confirm-modal">
          <p>이미 로그인 되어있습니다. 로그아웃 하시겠습니까?</p>
          <button onClick={handleConfirmLogout}>예</button>
          <button onClick={handleCancelLogout}>아니오</button>
        </div>
      )}
    </>
  );
};

export default Logout;

import React from "react";
import { logOut } from "../../Api/apis";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const [, , removeCookies] = useCookies();

  const handleLogout = async (): Promise<void> => {
    try {
      navigate("/");

      const res = await logOut();
      if (res) {
        localStorage.removeItem("role");
        removeCookies("accessToken");

        alert("로그아웃 되었습니다.");
        window.location.reload();
      }
    } catch (error: any) {
      console.error("로그아웃이 실패 하였습니다.", error);
    }
  };

  return (
    <>
      <li onClick={handleLogout}>로그아웃</li>
    </>
  );
};

export default Logout;

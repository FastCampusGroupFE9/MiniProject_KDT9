import { logOut } from "@/Api/apis";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [, , removeCookies] = useCookies();
  const handleLogout = async () => {
    try {
      navigate("/");

      const res = await logOut();
      if (res) {
        localStorage.removeItem("role");
        removeCookies("accessToken");

        alert("로그아웃 되었습니다.");
        window.location.reload();
      }
    } catch (error) {
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

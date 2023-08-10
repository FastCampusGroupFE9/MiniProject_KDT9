import { useNavigate } from "react-router-dom";
import "./AccessForbidden.scss";

const AccessForbidden = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="guide_wrap">
        <div className="main_text">접근이 제한된 서비스입니다.</div>
        <div className="sub_text">
          로그인 후 다시 이용해 주세요.
        </div>
        <button className="nav_btn" onClick={() => navigate("/")}>
          <span className="text">로그인 페이지</span>로 이동
          <span className="icon"> 👉</span>
        </button>
      </div>
      <div className="bg_circle">
        <div className="bg_text">
          ⎞ <span>ㅠ_ㅠ</span> ⎛
        </div>
      </div>
    </div>
  );
};

export default AccessForbidden;

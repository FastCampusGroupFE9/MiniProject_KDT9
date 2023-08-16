import { FormEvent, useState, useEffect  } from "react";
import "./LoginPage.scss";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { login } from "../../Api/apis";
import Modal from "../../Components/Modal/Modal";

interface LoginPageProps {
  setIsLogined: (value: boolean) => void;
}
const LoginPage: React.FC<LoginPageProps> = ({ setIsLogined }) => {
  // Input
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // Input-Check
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  // Modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  // Cookie
  const [ ,setCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();
   const [cookies, ,] = useCookies(["accessToken"]);

     useEffect(() => {
    // 이미 로그인되어 있는 경우, 메인 페이지로 리디렉션
    if (localStorage.getItem("role") && cookies.accessToken) {
      setIsLogined(true);
      navigate("/main");
    }
  }, [navigate, setIsLogined, cookies.accessToken]);

  useEffect(() => {
    const handleBackButton = () => {
      // 페이지에 뒤로가기 이벤트 리스너 추가
      // 여기서 다시 로그인 여부를 확인하고 처리할 수 있습니다.
      if (localStorage.getItem("role") && cookies.accessToken) {
        setIsLogined(true);
        navigate("/main");
      }
    };

    // 뒤로가기 이벤트 리스너 추가
    window.addEventListener("popstate", handleBackButton);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate, setIsLogined, cookies.accessToken]);


  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  // 패스워드 가시화 토글
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onClickLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const status = response?.status;
      if (status === 200) {
        const accessToken = response?.data.accessToken;
        const userRole = response?.data.role;
        if (accessToken && userRole) {
          localStorage.setItem("role", userRole);
          setCookie("accessToken", accessToken);
          setIsLogined(true);
          navigate("/main");
          window.location.reload();
        }
      }
    } catch (error) {
      setShowLoginModal(true);
    }
  };

  const handleClickModal = () => {
    setShowLoginModal(false);
  }

  return (
    <div className="login_page">
      <form className="login_box" onSubmit={onClickLogin}>
        <div className="login_title">로그인</div>
        <div className="content_wrap">
          <div className="content_box">
            <div className="input_box">
              <input
                className="input"
                placeholder="이메일 @email.com"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div className="inputErrorMessage">
              {!emailValid && email.length > 0 && (
                <div className="error_message">
                  올바른 이메일 형식을 입력해주세요.
                </div>
              )}
            </div>
          </div>
          <div className="content_box">
            <div className="input_box">
              <input
                className="input"
                type={showPassword ? "text" : "password"} // Toggle 비밀번호 보이기/가리기
                placeholder="비밀번호"
                value={password}
                onChange={handlePassword}
              />
              {showPassword ? (
                <i
                  className="fa-solid fa-eye"
                  onClick={handleTogglePassword}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={handleTogglePassword}
                ></i>
              )}
            </div>
            <div>
              {!passwordValid && password.length > 0 && (
                <div className="error_message">
                  영문, 숫자, 특수문자 포함 8자 이상 정규식 (추후 조건 따라 변경
                  필요)
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="btn_wrap">
          <button className="login_btn" onClick={(e) => onClickLogin(e)}>
            로그인
          </button>
          <div className="signup_btn" onClick={() => navigate("/signup")}>
            회원가입
          </div>
        </div>
      </form>
      <Modal visibility={showLoginModal} toggle={setShowLoginModal}>
        <div className="modal_content">
          <h2 className="modal_title">로그인에 실패하였습니다.</h2>
          <p className="modal_text">입력정보를 다시 확인해주세요.</p>
          <button className='modal_closebtn' onClick={handleClickModal}>닫기</button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginPage;

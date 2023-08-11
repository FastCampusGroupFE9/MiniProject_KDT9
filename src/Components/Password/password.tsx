import { ChangeEvent, useState } from "react";
import { postPassword } from "../../Api/apis"
import { useNavigate } from "react-router-dom";
import styles from "./Password.module.scss";

export default function Password() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const passwordRegex = // 영문, 숫자, 특수문자 포함 8자 이상
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword(value);

    switch (name) {
      case "password":
        setIsPasswordValid(passwordRegex.test(value));
        break;
      default:
        break;
    }
  };
  const handleConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleClick = async () => {
    if (password === confirmPassword) {
      try {
        const newPassword = { newPassword: password };
        const response = await postPassword(newPassword);
        setMessage("비밀번호 변경이 완료되었습니다."); // 추가: 성공 메시지 설정
        navigate("/main");
        console.log(response); // 이 부분은 필요에 따라 처리
      } catch (error) {
        console.error("패스워드 변경 실패:", error);
        setMessage("비밀번호 변경에 실패했습니다.");
      }
    } else {
      setMessage("암호가 일치하지 않습니다.");
    }
  };

  // 패스워드 가시화 토글
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={styles.password_page}>
      {/* <label>Password</label> */}
      <div className={styles.content_wrap}>
        <div className={styles.content_box}>
          <div className={styles.input_box}>
            <input
              name="password"
              className={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder={"변경할 비밀번호 입력"}
              value={password}
              onChange={handleChange}
            />
            {showPassword ? (
              <i className="fa-solid fa-eye" onClick={handleTogglePassword}></i>
            ) : (
              <i
                className="fa-solid fa-eye-slash"
                onClick={handleTogglePassword}
              ></i>
            )}
          </div>
          {!isPasswordValid && password.length > 0 && (
            <div className={styles.error_message}>
              영문, 숫자, 특수문자 포함 8자 이상 정규식
            </div>
          )}
        </div>
        <div className={styles.content_box}>
          <div className={styles.input_box}>
            <input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              className={styles.input}
              placeholder={"비밀번호를 확인"}
              value={confirmPassword}
              onChange={handleConfirmChange}
            />
            {showPassword ? (
              <i className="fa-solid fa-eye" onClick={handleTogglePassword}></i>
            ) : (
              <i
                className="fa-solid fa-eye-slash"
                onClick={handleTogglePassword}
              ></i>
            )}
          </div>
          {password !== confirmPassword ? (
            <div className={styles.error_message}>
              비밀번호가 일치하지 않습니다.
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <button className={styles.submit_btn} onClick={handleClick}>
        변경 완료
      </button>
      <span className={styles.submit_message}>
        {message && <p>{message}</p>}
      </span>
    </div>
  );
}

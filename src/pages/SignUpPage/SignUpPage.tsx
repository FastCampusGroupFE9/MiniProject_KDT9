import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../API/apis";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, index) => index + 1); // index가 0부터 시작이니까 +1
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "year":
        setSelectedYear(value);
        break;
      case "month":
        setSelectedMonth(value);
        break;
      case "day":
        setSelectedDay(value);
        break;
      default:
        break;
    }
  };

  const onSignupSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const join = `${selectedYear}-${selectedMonth
      .toString()
      .padStart(2, "0")}-${selectedDay.toString().padStart(2, "0")}`;
    try {
      const response = await signUp(email, password, name, join);
      if (response) {
        navigate("/main");
      }
      console.log(email, password, name, join);
    } catch (error) {
      console.log("signUpPageError: ", error);
    }
  };

  return (
    <div className="signUpPage">
      <div className="titleWrap">회원가입</div>
      <section className="section-form">
        <form onSubmit={onSignupSubmit}>
          <div>가입 정보</div>
          <div>
            <div>이름</div>
            <input
              name="name" // name 속성 추가
              value={name}
              type="text"
              placeholder="이름 | 닉네임"
              onChange={handleInputChange} // onChange 이벤트 핸들러 연결
            />
            {<div style={{ color: "red" }}>사용할 수 없는 닉네임입니다.</div>}
          </div>
          <div>
            <div>이메일</div>
            <input
              name="email" // name 속성 추가
              value={email}
              type="text"
              placeholder="이메일 @email.com"
              onChange={handleInputChange} // onChange 이벤트 핸들러 연결
            />
            {
              <div style={{ color: "red" }}>
                이메일 형식이 올바르지 않습니다.
              </div>
            }
          </div>
          <div>
            <div>비밀번호</div>
            <input
              name="password"
              value={password}
              type="password"
              placeholder="비밀번호 입력"
              onChange={handleInputChange} // onChange 이벤트 핸들러 연결
            />
          </div>
          <div>
            <div>비밀번호 확인</div>
            <input
              name="confirmPassword"
              value={confirmPassword}
              type="password"
              placeholder="비밀번호 재입력"
              onChange={handleInputChange} // onChange 이벤트 핸들러 연결
            />
            {password !== confirmPassword ? (
              <div style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</div>
            ) : (
              ""
            )}
          </div>

          <section className="section-date-pick">
            <div>입사일</div>
            <select
              name="year"
              value={selectedYear}
              onChange={handleInputChange}
            >
              <option value="year">연도</option>
              {Array.from(
                { length: 10 },
                (_, index) => currentYear - 10 + index,
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
              <option value={currentYear}>{currentYear}</option>
            </select>
            <select
              name="month"
              value={selectedMonth}
              onChange={handleInputChange}
            >
              <option value="month">월</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select name="day" value={selectedDay} onChange={handleInputChange}>
              <option value="day">일</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </section>
          <div className="signup-btn">
            <button type="submit">가입하기</button>
          </div>
        </form>
      </section>
    </div>
  );
}

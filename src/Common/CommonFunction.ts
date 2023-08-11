import dayjs from "dayjs";

  // 시작일과 마지막일을 계산하여 연차 기간 일 수 반환 및 입사일과 오늘 날짜를 반환하면 총입사일수 반환
  export function DateCount({ startDate, endDate }: { startDate: string, endDate: string }):string|number {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (!start.isValid() || !end.isValid()) {
      console.error('Invalid input: startDate and endDate must represent valid dates.');
      return 'Invalid input';
    }
    const diffInDays:number = end.diff(start, 'day');
    return diffInDays + 1
  }

  // 입사일에 따른 직급을 구분하여 연차 날짜 계산 및 객체로 직급과 총연차일 반환
  export function JickCounter(date: string) {
    const diffYears = Math.floor(Number(date) / 365); // 입사일부터 오늘까지의 기간을 연 단위로 계산
    const jick = {answer:"", annualBalance:0}

    if (diffYears < 1) {
      jick.answer = "사원";
      jick.annualBalance = 20
    } else if (diffYears < 3) {
      jick.answer = "주임";
      jick.annualBalance = 30
    } else if (diffYears < 5) {
      jick.answer = "대리";
      jick.annualBalance = 40
    } else if (diffYears > 5){
      jick.answer = "과장";
      jick.annualBalance = 50
    }
    return jick
  }






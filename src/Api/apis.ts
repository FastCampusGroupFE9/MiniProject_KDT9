import axios, { AxiosInstance } from "axios";
import { Cookies } from "react-cookie";
import { UpdateType } from "types/common";

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
// 해당변수는 호스트가 localhost에서 클라이언트 서버를 열면 값이 없지만 다른 호스트를 사용시에는 netlify.toml에 설정해둔
// proxy값을 할당 받는다.

//아래처럼 요청 URI앞에 변수 PROXY를 추가해준다.
 axios
      .get(
        `${PROXY}/kart/v1.0/users/nickname/${encodeURI(
          nickname.current.value,
        )}`,
        headers,
      )
      .then(res => console.log(res.data))
	  .catch(err => console.error(err))
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
export const getAccessToken = (): string | undefined => {
  const cookie = new Cookies();
  return cookie.get("accessToken");
};


const ACCESSTOKEN = getAccessToken();
export const ApiHttp: AxiosInstance = axios.create({
  baseURL: `${PROXY}/mini`/,
  headers: {
    Authorization: `Bearer ${ACCESSTOKEN}`,
  },
});

export const ApiLogin: AxiosInstance = axios.create({
  baseURL: `${PROXY}/mini`/,
});

// 재요청 인스턴스
export const getSilentAxios = (token: string): AxiosInstance => {
  const silentAxios: AxiosInstance = axios.create({
    baseURL: `${PROXY}/mini`/,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  silentAxios.interceptors.response.use(
    async (res) => res,
    async (error) => {
      if (error.response.status === 403) {
        try {
          const NEW_ACCESSTOKEN = await getNewAccessToken();
          const config = error.config;
          config.headers.Authorization = `Bearer ${NEW_ACCESSTOKEN}`;
          document.cookie = `accessToken=${NEW_ACCESSTOKEN}; path=/; `;
          const response = await axios.get(config.url, config);
          return response.data;
        } catch (error) {
          console.log("재요청에러: ", error);
        }
      }
      throw error;
    },
  );
  return silentAxios;
};

// NEW_ACCESSTOKEN (리프레시 토큰 요청 => 새로운 엑세스 토큰 반환)
export const getNewAccessToken = async (): Promise<string> => {
  try {
    const response = await ApiHttp.post(
      "https://leeyongsoo-calendar--hmteresting.netlify.app/api/token",
      {},
      {
        headers: {
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
        withCredentials: true,
      },
    );
    const newAccessToken: string = response.data;
    return newAccessToken;
  } catch (error) {
    console.error("getNewAccessTokenAPI에러: ", error);
    throw error;
  }
};

// ADMIN_PAGE
export const getListAll = async (): Promise<any> => {
  try {
    const res = await ApiHttp.get("https://leeyongsoo-calendar--hmteresting.netlify.app/api/admin");
    return res.data;
  } catch (error) {
    console.log("getListAllAPI-Error:", error);
  }
};

// ADMIN_연차/당직 승인 처리
export const permission = async (item: { id: number }): Promise<any> => {
  try {
    const res = await ApiHttp.post(
      "https://leeyongsoo-calendar--hmteresting.netlify.app/api/admin/apply",
      { id: item.id },
      {
        headers: {
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
        withCredentials: true,
      },
    );
    return res.data;
  } catch (error) {
    console.error("permission 에러: ", error);
    throw error;
  }
};

// GET_MY_PAGE
export const getMyPage = async (): Promise<any> => {
  try {
    const res = await ApiHttp.get("https://leeyongsoo-calendar--hmteresting.netlify.app/api/user");
    return res.data;
  } catch (error) {
    const ACCESSTOKEN = getAccessToken();
    const silentAxios = getSilentAxios(ACCESSTOKEN ?? "");
    const result = await silentAxios.get("/api/user");
    return result.data; // Assuming result is an AxiosResponse object
  }
};

// LOG_IN
export const login = async (email: string, password: string): Promise<any> => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await ApiLogin.post(
      "/api/login",
      {
        email,
        password,
      },
      { withCredentials: true },
    );
  } catch (error) {
    throw error;
  }
};

// LOG_OUT
export const logOut = async (): Promise<any> => {
  try {
    const res = await ApiHttp.post(
      "/api/logout",
      {},
      { withCredentials: true },
    );
    return res;
  } catch (error) {
    console.error("로그아웃이 실패 하였습니다.", error);
  }
};

// SIGN_UP
export const signUp = async (
  email: string,
  password: string,
  name: string,
  join: string,
): Promise<any> => {
// eslint-disable-next-line no-useless-catch
  try {
    const response = await ApiLogin.post("https://leeyongsoo-calendar--hmteresting.netlify.app/api/register", {
      email,
      password,
      name,
      join,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET_MAIN_PAGE
export const getMainPage = async (token: string): Promise<any> => {
  try {
    const response = await ApiHttp.get("https://leeyongsoo-calendar--hmteresting.netlify.app/api/main", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    const ACCESSTOKEN = getAccessToken();
    const silentAxios = getSilentAxios(ACCESSTOKEN ?? "");
    const result = await silentAxios.get("https://leeyongsoo-calendar--hmteresting.netlify.app/api/main");
    return result.data; // Assuming result is an AxiosResponse object
  }
};

export const postMain = async (
  title: string,
  category: string,
  endDate: string,
  reason: string,
  startDate: string,
): Promise<any> => {
  try {
    const response = await ApiHttp.post("https://leeyongsoo-calendar--hmteresting.netlify.app/api/annual", {
      title,
      category,
      endDate,
      reason,
      startDate,
    });
    return response.data;
  } catch (error) {
    console.log("postMain 호출:", error);
    throw error;
  }
};

export async function postPassword(data: {
  newPassword: string;
}): Promise<any> {
  try {
    const response = await ApiHttp.post("/api/user", data);
    console.log("비밀번호 변경 완료", response);
    return response.data; // Assuming response contains relevant data
  } catch (error) {
    console.error("패스워드 변경 실패:", error);
    throw error;
  }
}

export async function postUpdate(data: UpdateType): Promise<any> {
  try {
    const response = await ApiHttp.post("/api/annual/update", data);
    console.log("수정 완료", response.status);
    return response.status; // Assuming response contains relevant data
  } catch (error) {
    console.error("Error submitting event:", error);
    throw error;
  }
}

export async function postDelete(id: number): Promise<any> {
  try {
    const response = await ApiHttp.post("https://leeyongsoo-calendar--hmteresting.netlify.app/api/annual/cancel", { id });
    console.log("삭제 완료", response.status);
    alert("삭제 완료");
    return response.status;
  } catch (error) {
    console.error("Error submitting event:", error);
    throw error;
  }
}

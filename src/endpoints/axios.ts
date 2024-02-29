import axios, { AxiosRequestConfig } from "axios";
import Cookie from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const parseJWT = (token: string) => {
  try {
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
export const axiosClient = async (
  method: string,
  endpoint: string,
  data?: any,
  headers?: { [key: string]: string },
) => {
  const axiosOptions: AxiosRequestConfig = {
    baseURL: `${BASE_URL ?? ""}`,
    method,
    url: endpoint,
    data,
    timeout: 10000,
  };
  let isAuth = true;

  const localToken = Cookie.get("accessToken");
  if (localToken) {
    const decodedJWT = parseJWT(localToken);

    if (decodedJWT.exp * 1000 < Date.now()) {

      localStorage.removeItem("@ownerpreneurUser");
      Cookie.remove("accessToken");
      Cookie.remove("refresh-token");
      isAuth = false;
    }
  } else {
    isAuth = false;
  }
  if (isAuth) {
    axiosOptions.headers = {
      Authorization: `Bearer ${localToken}`,
      ...headers,
    };
  } else {
    axiosOptions.headers = {
      ...headers,
    };
  }

  const res = await axios.request({
    ...axiosOptions,
  });
  return res.data;
};

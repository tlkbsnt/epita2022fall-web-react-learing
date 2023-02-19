import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

let baseURL = "";

if (process.env.NODE_ENV == "production") {
  baseURL = process.env.BASE_URL || "";
} else {
  baseURL = "http://localhost:8080/api/";
}
  //"http://warehouse.qubex.info.np/api/";
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (request) => {
  const user = Cookies.get("user");
  if (user) {
    const _user = JSON.parse(user);
    request.headers.Authorization = `Bearer ${_user.accessToken}`;
  }
  return request;
});

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (Cookies.get("user")) {
      Cookies.remove("user");
      Cookies.remove("isAuthenticated");
    }
    console.log(error);
  }
);

export default instance;

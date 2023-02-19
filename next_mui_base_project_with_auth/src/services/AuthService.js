import axiosInstance from "./http";

class AuthService {
  getMeData = async () => {
    const resp = await axiosInstance.get("auth/me");
    const me = resp.data.user;
    return me;
  };

  loginUser = async (username, password) => {
    const resp = await axiosInstance.post("auth/login", {
      username,
      password,
    });
    const userTokens = resp.data;
    return userTokens;
  };
}

export default AuthService;

import { AxiosInstance } from 'axios';
import { getAuthorizationHeader } from '../utils/getAuthorizationHeader';

export class AuthService {
  protected readonly _http: AxiosInstance;

  public constructor(http: AxiosInstance) {
    this._http = http;
  }

  login = async (username: string, password: string) => {
    const res = await this._http.post('/auth/login', {
      username,
      password,
    });
    return {
      accessToken: res.data.accessToken,
      expiredAt: res.data.expiredIn,
    };
  };

  getMe = (userId: string) => {
    return this._http
      .get(`/users/${userId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      });
  };
}

import { BACKEND_URL } from "../constants";
import { handleStandardResponse, HTTPTransport } from "./Api";

type TOptionsUserAPI = {
  baseUrl: string,
  headers: {
    'Accept': string
    'Content-Type': string
  }
}

export type TUserValues = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  display_name: string,
  phone: string
}

export type TPasswords = {
  oldPassword: string,
  newPassword: string
}

class UserApi extends HTTPTransport {
  _baseUrl: string;
  _headers: {
    'Accept': string
    'Content-Type': string
  };

  constructor({ baseUrl, headers }: TOptionsUserAPI) {
    super();
    this._baseUrl = baseUrl
    this._headers = headers
  }

  changeUserProfile(profileValues: TUserValues) {
    return this.put(
      `${this._baseUrl}/api/v2/user/profile`,
      {
        headers: this._headers,
        data: profileValues
      }
    ).then(handleStandardResponse)
  }

  changeUserPassword(passwords: TPasswords) {
    return this.put(
      `${this._baseUrl}/api/v2/user/password`,
      {
        headers: this._headers,
        data: passwords
      }
    ).then(handleStandardResponse)
  }

  changeAvatar(form: HTMLFormElement) {
    const data = new FormData(form);

    return this.put(
      `${this._baseUrl}/api/v2/user/profile/avatar`,
      { data }
    ).then(handleStandardResponse)
  }

  searchUsersByLogin(userLogin: string) {
    return this.post(
      `${this._baseUrl}/api/v2/user/search`,
      {
        headers: this._headers,
        data: { login: userLogin }
      }
    ).then(handleStandardResponse)
  }
}

export const userApi = new UserApi({
  baseUrl: BACKEND_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

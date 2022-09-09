import { HTTPTransport } from "./Api";

type TOptionsProfileAPI = {
  baseUrl: string,
  headers: {
    'Accept': string
    'Content-Type': string
  }
}

export type TProfileValues = {
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

class ProfileApi extends HTTPTransport {
  _baseUrl: string;
  _headers: {
    'Accept': string
    'Content-Type': string
  };

  constructor({ baseUrl, headers }: TOptionsProfileAPI) {
    super();
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _handleResponse(res: {status: number, responseText: string}) {
    const isJson = (str: any): boolean => {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
    }

    if (res.status === 200) {
      if (isJson(res.responseText)) {
        return JSON.parse(res.responseText)
      } else {
        return res.responseText;
      }
    }

    let errText: string | undefined = '';
    if (isJson(res.responseText)) {
      errText = JSON.parse(res.responseText).reason
    } else {
      errText = res.responseText
    }
    return Promise.reject(errText ? errText : `Произошла ошибка ${res.status}`)
  }

  changeUserProfile(profileValues: TProfileValues) {
    return this.put(
      `${this._baseUrl}/api/v2/user/profile`,
      {
        headers: this._headers,
        data: profileValues
      }
    ).then(this._handleResponse)
  }

  changeUserPassword(passwords: TPasswords) {
    return this.put(
      `${this._baseUrl}/api/v2/user/password`,
      {
        headers: this._headers,
        data: passwords
      }
    ).then(this._handleResponse)
  }

  changeAvatar(form: HTMLFormElement) {
    const data = new FormData(form);

    return this.put(
      `${this._baseUrl}/api/v2/user/profile/avatar`,
      { data }
    ).then(this._handleResponse)
  }
}

export const profileApi = new ProfileApi({
  baseUrl: "https://ya-praktikum.tech",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});
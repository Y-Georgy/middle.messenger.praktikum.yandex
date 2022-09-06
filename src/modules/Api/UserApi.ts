import { HTTPTransport } from "./Api";

type TOptionsUserAPI = {
  baseUrl: string,
  headers: {
    'Accept': string
    'Content-Type': string
  }
}

export type TRegisterValues = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  repeatPassword?: string,
  phone: string
}

export type TLoginValues = {
  login: string,
  password: string,
}

class UserAPI extends HTTPTransport {
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

  _handleResponse(res: {status: number, responseText: string}) {
    if (res.status === 200) {
      try {
        return JSON.parse(res.responseText)
      } catch (e) {
        return res.responseText;
      }
    }

    const errText: string | undefined = JSON.parse(res.responseText).reason;
    return Promise.reject(errText ? errText : `Произошла ошибка ${res.status}`)
  }

  register(registerValues: TRegisterValues) {
    return this.post(
      `${this._baseUrl}/api/v2/auth/signup`,
      {
        headers: this._headers,
        data: registerValues
      }
    )
    .then(this._handleResponse)
  }

  login(loginValues: TLoginValues) {
    return this.post(
      `${this._baseUrl}/api/v2/auth/signin`,
      {
        headers: this._headers,
        data: loginValues
      }
    )
    .then(this._handleResponse)
  }
}

export const userApi = new UserAPI({
  baseUrl: "https://ya-praktikum.tech",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});
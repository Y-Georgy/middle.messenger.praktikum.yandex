import { BACKEND_URL } from "../constants";
import { Router } from "../Router/Router";
import { HTTPTransport } from "./Api";

type TOptionsAuthAPI = {
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

const router = new Router();
class AuthAPI extends HTTPTransport {
  _baseUrl: string;
  _headers: {
    'Accept': string
    'Content-Type': string
  };

  constructor({ baseUrl, headers }: TOptionsAuthAPI) {
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

    if (res.status === 401 && window.location.pathname !== "/register") {
      router.go('/login')
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
    ).then(this._handleResponse)
  }

  login(loginValues: TLoginValues) {
    return this.post(
      `${this._baseUrl}/api/v2/auth/signin`,
      {
        headers: this._headers,
        data: loginValues
      }
    ).then(this._handleResponse)
  }

  getUser() {
    return this.get(
      `${this._baseUrl}/api/v2/auth/user`,
      {
        headers: this._headers,
      }
    ).then(this._handleResponse)
  }

  logout() {
    return this.post(
      `${this._baseUrl}/api/v2/auth/logout`,
      {
        headers: this._headers,
      }
    ).then(this._handleResponse)
  }
}

export const authApi = new AuthAPI({
  baseUrl: BACKEND_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

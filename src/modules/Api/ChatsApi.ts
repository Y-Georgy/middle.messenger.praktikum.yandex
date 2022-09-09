import { BACKEND_URL } from "../constants";
import { HTTPTransport } from "./Api";

type TOptionsChatsAPI = {
  baseUrl: string,
  headers: {
    'Accept': string
    'Content-Type': string
  }
}

class ChatsApi extends HTTPTransport {
  _baseUrl: string;
  _headers: {
    'Accept': string
    'Content-Type': string
  };

  constructor({ baseUrl, headers }: TOptionsChatsAPI) {
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

  getChats() {
    return this.get(
      `${this._baseUrl}/api/v2/chats`,
      {
        headers: this._headers,
      }
    ).then(this._handleResponse)
  }
}

export const chatsApi = new ChatsApi({
  baseUrl: BACKEND_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});
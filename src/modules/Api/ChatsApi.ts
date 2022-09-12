import { BACKEND_URL } from "../constants";
import { handleStandardResponse, HTTPTransport } from "./Api";

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

  getChats() {
    return this.get(
      `${this._baseUrl}/api/v2/chats`,
      {
        headers: this._headers,
      }
    ).then(handleStandardResponse)
  }

  createChat(title: string) {
    return this.post(
      `${this._baseUrl}/api/v2/chats`,
      {
        headers: this._headers,
        data: { title }
      }
    ).then(handleStandardResponse)
  }

  getChatToken(chatId: number) {
    return this.post(
      `${this._baseUrl}/api/v2/chats/token/${chatId}`,
      {
        headers: this._headers,
      }
    ).then(handleStandardResponse)
  }

  addUserToChat(userId: number, chatId: number) {
    return this.put(
      `${this._baseUrl}/api/v2/chats/users`,
      {
        headers: this._headers,
        data: {
          users: [ userId ],
          chatId: chatId
        }
      }
    ).then(handleStandardResponse)
  }

  deleteUserFromChat(userId: number, chatId: number) {
    return this.delete(
      `${this._baseUrl}/api/v2/chats/users`,
      {
        headers: this._headers,
        data: {
          users: [ userId ],
          chatId: chatId
        }
      }
    ).then(handleStandardResponse)
  }
}

export const chatsApi = new ChatsApi({
  baseUrl: BACKEND_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

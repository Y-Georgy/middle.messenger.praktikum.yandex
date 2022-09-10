import { TMessageApi } from "../../pages/chat";

export function letsSocket(userId: number, chatId: number, token: string, onMessage: (messages: TMessageApi[]) => void) {

  const socket = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );

  let interval: NodeJS.Timer | null = null;

  socket.addEventListener("message", (event) => {
    console.log("Получены данные", event);
    onMessage(JSON.parse(event.data));
  });

  socket.addEventListener("error", (event: any) => {
    console.log("Ошибка", event.message);
  });

  socket.addEventListener("open", () => {
    console.log("Соединение установлено");

    socket.send(
      JSON.stringify({
        content: 0,
        type: "get old"
      })
    );

    interval = setInterval(() => {
      socket.send(
        JSON.stringify({
          type: "ping",
        })
      );
    }, 50000);
  });

  socket.addEventListener("close", (event) => {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }
    if (interval) {
      clearInterval(interval);
    }
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });
}
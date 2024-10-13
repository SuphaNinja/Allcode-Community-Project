import { io } from "socket.io-client";

const isLocal = process.env.NODE_ENV === "development";

const token = localStorage.getItem("token")

const socket = io(isLocal ? "https://socket.allcodecommunity.com" : "https://socket.allcodecommunity.com", {
  withCredentials: true,
  transportOptions: ['websocket', 'polling', 'flashsocket'],
  extraHeaders: {
    "x-access-token": token ? token : ""
  }
});

export default socket;
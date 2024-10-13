import { io } from "socket.io-client";

const isLocal = process.env.NODE_ENV === "development";

const token = localStorage.getItem("token")

const socket = io(isLocal ? "http://localhost:7070" : "https://socket.allcodecommunity.com", {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  extraHeaders: {
    "x-access-token": token ? token : "123"
  }
});

export default socket;
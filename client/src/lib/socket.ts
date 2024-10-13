import { io } from "socket.io-client";

const isLocal = process.env.NODE_ENV === "development";

const socket = io(isLocal ? "http://localhost:7070" : "https://socket.allcodecommunity.com", {
  withCredentials: true,
  transports: ['websocket', 'polling']
});

export default socket;
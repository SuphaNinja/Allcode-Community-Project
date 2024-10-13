import { io } from "socket.io-client";

const isLocal = process.env.NODE_ENV === "development";

const socket = io(isLocal ? "http://localhost:7070" : "wss://socket.allcodecommunity.com", {
  withCredentials: true,
});

export default socket;
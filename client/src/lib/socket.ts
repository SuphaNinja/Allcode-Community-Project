import { io } from "socket.io-client";

const isLocal = process.env.NODE_ENV === "development";

const socket = io(isLocal ? "wss://socket.allcodecommunity.com" : "wss://socket.allcodecommunity.com", {
  withCredentials: true,
  transportOptions: ['websocket', 'polling', 'flashsocket'],
  extraHeaders: {
    "Access-Control-Allow-Origin": "*"
  }
});

export default socket;
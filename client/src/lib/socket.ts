import { io } from "socket.io-client";

const socket = io("https://socket.allcodecommunity.com:7070");

export default socket;
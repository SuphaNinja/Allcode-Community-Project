import { io } from "socket.io-client";

const socket = io("https://allcode-community-project-z4em.vercel.app", {
  path: "/api/socket",
  transports: ['websocket']
});

export default socket;
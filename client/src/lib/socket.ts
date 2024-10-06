import { io } from "socket.io-client";

const isProduction = process.env.NODE_ENV === 'production';

const SOCKET_URL = isProduction
  ? "https://allcode-community-project-z4em.vercel.app"
  : "http://localhost:8080";

const socket = io(SOCKET_URL, {
  path: '/api/socket',
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

export default socket;
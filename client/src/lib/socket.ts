import { io } from "socket.io-client";

const isProduction = process.env.NODE_ENV === 'production';

const SOCKET_URL = isProduction
  ? "https://allcode-community-project-z4em.vercel.app"
  : "http://localhost:7070";

const socket = io(SOCKET_URL);

export default socket;
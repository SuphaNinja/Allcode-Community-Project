import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocketServer } from "./src/socketServer.js";
import dotenv from 'dotenv';

dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    path: "/api/socket",
    cors: {
        origin: ["https://www.allcodecommunity.com", "http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true
    },
});

initializeSocketServer(io);

const PORT = process.env.PORT || 8080;


export default httpServer;
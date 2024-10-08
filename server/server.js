import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocketServer } from "./src/socketServer.js";
import dotenv from 'dotenv';

dotenv.config();

const httpServer = createServer(app);

const isLocal = process.env.NODE_ENV === "development";

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});





export default httpServer;

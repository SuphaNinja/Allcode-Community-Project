import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocketServer } from "./src/socketServer.js";
import dotenv from 'dotenv';

dotenv.config();

const httpServer = createServer(app);

const isLocal = process.env.NODE_ENV === "LOCAL";

const io = new Server(httpServer, {
    path: "/api/socket",
    cors: {
        origin: isLocal
            ? ["http://localhost:5173"]
            : ["https://www.allcodecommunity.com"],
        methods: ["GET", "POST"],
        credentials: true
    },
});

initializeSocketServer(io);

const PORT = process.env.PORT || (isLocal ? 3000 : 8080);

if (isLocal) {
    httpServer.listen(PORT, () => {
        console.log(`Server is running in LOCAL mode on port ${PORT}`);
    });
} else {
    console.log(`Server is configured for PRODUCTION mode on port ${PORT}`);
}

export default httpServer;

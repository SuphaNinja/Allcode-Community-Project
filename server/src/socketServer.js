import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocketEvents } from "./websocket/socketEvents.js";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: ["https://www.allcodecommunity.com", "http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["x-access-token"],
        
    }
});

setupSocketEvents(io);

const WEBSOCKET_PORT = 7070; 
httpServer.listen(WEBSOCKET_PORT, () => {
    console.log(`WebSocket server is running on port ${WEBSOCKET_PORT}`);
});

export { io };
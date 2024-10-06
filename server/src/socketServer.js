import { Server } from 'socket.io';

let io;
const userSocketMap = new Map();

export function initializeSocketServer(server) {
    io = new Server(server, {
        path: "/api/socket",
        cors: {
            origin: ["https://www.allcodecommunity.com", "http://localhost:3000"],
            methods: ["GET", "POST"],
            credentials: true
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("register", (userId) => {
            if (userId && socket.id) {
                userSocketMap.set(userId, socket.id);
            }
        });

        socket.on("disconnect", () => {
            for (const [id, sid] of userSocketMap.entries()) {
                if (sid === socket.id) {
                    userSocketMap.delete(id);
                    break;
                }
            }
            console.log("User disconnected");
        });

        socket.on("send_message", (message) => {
            console.log(message);
            const receiverSocketId = userSocketMap.get(message.receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("new_message", message);
            }

            socket.emit("new_message", message);
        });
    });
}

export function sendNotification(userId, notification) {
    const socketId = userSocketMap.get(userId);
    if (socketId) {
        io.to(socketId).emit("notification", notification);
    }
}
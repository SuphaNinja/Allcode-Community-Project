import { Server } from 'socket.io';
import { createServer } from 'http';

let io;
const userSocketMap = new Map();

export function initializeSocketServer(app) {
    const socketServer = createServer(app);
    io = new Server(socketServer, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
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
        });

        socket.on("send_message", (message) => {
            console.log(message);
            const receiverSocketId = userSocketMap.get(message.receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("new_message", message);
            }
            // Also emit the message back to the sender
            socket.emit("new_message", message);
        });
    });

    return socketServer;
}

export function sendNotification(userId, notification) {
    const socketId = userSocketMap.get(userId);
    if (socketId) {
        io.to(socketId).emit("notification", notification);
    }
}
import { Server } from 'socket.io';

export default function SocketHandler(req, res) {
    if (res.socket.server.io) {
        console.log('Socket is already running');
        res.end();
        return;
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    const userSocketMap = new Map();

    io.on('connection', (socket) => {
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

            socket.emit("new_message", message);
        });
    });

    console.log('Socket is initializing');
    res.end();
}   
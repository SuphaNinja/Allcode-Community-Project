import { addUserSocket, removeUserSocket, getUserSocketId } from "./socketManager.js";

export function handleConnection(socket) {
    console.log("A user connected");

    socket.on("register", (userId) => {
        if (userId && socket.id) {
            addUserSocket(userId, socket.id);
        }
    });

    socket.on("disconnect", () => {
        removeUserSocket(socket.id);
        console.log("User disconnected");
    });
}

export function handleSendMessage(io, message) {
    console.log(message);
    const receiverSocketId = getUserSocketId(message.receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("new_message", message);
    }

    io.to(message.senderSocketId).emit("new_message", message);
}
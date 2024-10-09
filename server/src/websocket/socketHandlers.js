import { addUserSocket, removeUserSocket, getUserSocketId } from "./socketManager.js";
import prisma from "../../prisma/Prisma.js";


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

export function handleSendMessage(io, {messageContent}) {
    console.log(messageContent)
    const receiverSocketId = getUserSocketId(messageContent.receiverId);
    const senderSocketId = getUserSocketId(messageContent.senderId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("new_message", messageContent);
    }
    io.to(senderSocketId).emit("new_message", messageContent);
}
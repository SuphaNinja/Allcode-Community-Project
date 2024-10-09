import { addUserSocket, removeUserSocket, getUserSocketId } from "./socketManager.js";
import prisma from "../../prisma/Prisma.js";
import { sendNotification } from "./socketManager.js";


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

export async function handleSendMessage(io, {messageContent}) {
    console.log("testtstst",messageContent)

    try {
        const newMessage = await prisma.message.create({
            data: { content: messageContent.content, senderId: messageContent.senderId, receiverId: messageContent.receiverId, }
        });

        const sender = await prisma.user.findUnique({
            where: { id: messageContent.senderId }
        });

        await prisma.notification.create({
            data: {
                type: 'NEW_MESSAGE',
                content: `You have a new message from ${sender.firstName} ${sender.lastName}!`,
                senderId: messageContent.senderId,
                receiverId: messageContent.receiverId,
                linkUrl: "/livechat"
            }
        });

        sendNotification(messageContent.receiverId, {
            type: 'NEW_MESSAGE',
            Title: `New message from ${sender.firstName} ${sender.lastName}`,
            content: 'You have a new message',
            linkUrl: "/livechat",
            senderId: messageContent.senderId
        });
        
        const receiverSocketId = getUserSocketId(messageContent.receiverId);
        const senderSocketId = getUserSocketId(messageContent.senderId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("new_message", newMessage);
        }
        io.to(senderSocketId).emit("new_message", newMessage);

    } catch (error) {
        console.log(error)
        
    };
    
}
const userSocketMap = new Map();

export function addUserSocket(userId, socketId) {
    userSocketMap.set(userId, socketId);
}

export function removeUserSocket(socketId) {
    for (const [userId, sid] of userSocketMap.entries()) {
        if (sid === socketId) {
            userSocketMap.delete(userId);
            break;
        }
    }
}

export function getUserSocketId(userId) {
    return userSocketMap.get(userId);
}

export function sendNotification(io, userId, notification) {
    const socketId = getUserSocketId(userId);
    if (socketId) {
        io.to(socketId).emit("notification", notification);
    }
}
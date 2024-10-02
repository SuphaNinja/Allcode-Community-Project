import { createUser, login, getCurrentUser, addFriend, removeFriend, getAllUsers, getFriends, getMessages, sendMessage, markMessagesAsRead, getFriendsWithLastMessage, toggleCloseFriend } from "../controllers/userController.js"
import express from "express";
import verifyToken from "../controllers/verifyToken.js";

const userRoutes = express.Router();

userRoutes.post("/signup", createUser)
userRoutes.post("/login", login)
userRoutes.get("/get-current-user", verifyToken, getCurrentUser)
userRoutes.get("/get-all-users", getAllUsers)

userRoutes.get("/get-friends", verifyToken, getFriends)
userRoutes.post("/add-friend", verifyToken, addFriend)
userRoutes.post("/remove-friend", verifyToken, removeFriend)

userRoutes.post("/get-messages", verifyToken, getMessages)
userRoutes.post("/send-message", verifyToken, sendMessage)
userRoutes.post("/read-message", verifyToken, markMessagesAsRead)
userRoutes.get("/get-friends-with-last-message", verifyToken, getFriendsWithLastMessage)
userRoutes.post("/toggle-close-friend", verifyToken, toggleCloseFriend)

export default userRoutes;

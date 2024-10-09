import { createUser, login, getCurrentUser, addFriend, removeFriend, getAllUsers, getFriends, getMessages, markMessagesAsRead, getFriendsWithLastMessage, toggleCloseFriend, getUserById, getNotifications, markNotificationAsRead, markAllNotificationsAsRead, updateUserProfile, deleteUser } from "../controllers/userController.js"
import express from "express";
import verifyToken from "../controllers/verifyToken.js";

const userRoutes = express.Router();

userRoutes.post("/signup", createUser)
userRoutes.post("/login", login)
userRoutes.get("/get-current-user", verifyToken, getCurrentUser)
userRoutes.post("/get-user-by-id", getUserById)
userRoutes.get("/get-all-users", getAllUsers)
userRoutes.post("/update-user-profile", verifyToken, updateUserProfile)
userRoutes.post("/delete-user", verifyToken, deleteUser)

userRoutes.get("/get-friends", verifyToken, getFriends)
userRoutes.post("/add-friend", verifyToken, addFriend)
userRoutes.post("/remove-friend", verifyToken, removeFriend)
userRoutes.post("/toggle-close-friend", verifyToken, toggleCloseFriend)

userRoutes.post("/get-messages", verifyToken, getMessages)
userRoutes.post("/read-message", verifyToken, markMessagesAsRead)
userRoutes.get("/get-friends-with-last-message", verifyToken, getFriendsWithLastMessage)

userRoutes.get("/get-notifications", verifyToken, getNotifications)
userRoutes.post("/mark-notifications-as-read", verifyToken, markNotificationAsRead)
userRoutes.post("/mark-all-notifications-as-read", verifyToken, markAllNotificationsAsRead)

export default userRoutes;

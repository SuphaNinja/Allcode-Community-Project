import { createUser, login, getCurrentUser } from "../controllers/userController.js"
import express from "express";
import verifyToken from "../controllers/verifyToken.js";

const userRoutes = express.Router();

userRoutes.post("/signup", createUser)
userRoutes.post("/login", login)
userRoutes.get("/get-current-user", verifyToken, getCurrentUser)

export default userRoutes;

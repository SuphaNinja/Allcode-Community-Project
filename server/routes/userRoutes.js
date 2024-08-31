import { createUser } from "../Controllers/userController.js";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/signup", createUser)

export default userRoutes;

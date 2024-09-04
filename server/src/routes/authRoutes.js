import express  from "express";
import { confirmEmail, resetPassword, updatePassword } from "../Controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post('/confirm-email', confirmEmail);
authRoutes.post("/reset-password", resetPassword);
authRoutes.post("/update-password", updatePassword);

export default authRoutes;
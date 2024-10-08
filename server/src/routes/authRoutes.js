import express  from "express";
import { confirmEmail, manuallySendEmailConfirmation, resetPassword, updatePassword } from "../controllers/authController.js";
import verifyToken from "../controllers/verifyToken.js";

const authRoutes = express.Router();

authRoutes.post('/confirm-email', confirmEmail);
authRoutes.post("/reset-password", resetPassword);
authRoutes.post("/update-password", updatePassword);
authRoutes.post("/send-verification-email",verifyToken, manuallySendEmailConfirmation);

export default authRoutes;
import express  from "express";
import { confirmEmail } from "../Controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post('/confirm-email', confirmEmail);

export default authRoutes;
import express from "express";
import { registerUser, authLogin } from "../controllers/authController.mjs";

export const authRoutes = express.Router();

authRoutes.post("/signup", registerUser);
authRoutes.post("/login", authLogin);


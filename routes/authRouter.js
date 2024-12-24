import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import { validateRegistrationInfo, validateLoginInfo } from "../middleware/validationMiddleWare.js";

const router = Router();


router.post("/register", validateRegistrationInfo, register)
router.post("/login", validateLoginInfo, login)
router.get("/logout", logout)


export default router
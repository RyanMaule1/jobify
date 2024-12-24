import { Router } from "express";
import { logout, login, register } from "../controllers/authController.js";
import { getCurrentUser, getApplicationStats, updateUser  } from "../controllers/userControllers.js";
import { validateUpdatedUserInput } from "../middleware/validationMiddleWare.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router = Router();


router.get("/current-user", getCurrentUser)
router.get("/admin/app-stats", [authorizePermissions('admin'), getApplicationStats])
router.patch("/update-user",upload.single('avatar'), validateUpdatedUserInput, updateUser)


export default router
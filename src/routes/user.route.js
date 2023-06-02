import { Router } from "express";
import { userHome } from "../controllers/user.controller.js";
const router = Router();
router.get("/", userHome);

export default router;

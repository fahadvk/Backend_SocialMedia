import { Request, Response, Router } from "express";
import { createPost } from "../Controllers/PostController";
import { verifyToken } from "../middlewares/authentication";
const router = Router();
router.post("/create", verifyToken, createPost);
export default router;

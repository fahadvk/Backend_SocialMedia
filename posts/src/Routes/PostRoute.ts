import { Request, Response, Router } from "express";
import { createPost,fetchAll } from "../Controllers/PostController";
import { verifyToken } from "../middlewares/authentication";
const router = Router();
router.post("/create", verifyToken, createPost);
router.get('/allPosts',fetchAll)
export default router;

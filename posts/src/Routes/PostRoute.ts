import { Request, Response, Router } from "express";
import { addLike, createPost,fetchAll } from "../Controllers/PostController";
import { verifyToken } from "../middlewares/authentication";
const router = Router();
router.post("/create", verifyToken, createPost);
router.get('/allPosts',fetchAll)
router.patch('/addLike',verifyToken,addLike)
export default router;

import { Request, Response, Router } from "express";
import { addComment,fetchCommentsbyPostId } from "../Controllers/CommentController";
import { addLike, createPost,fetchAll } from "../Controllers/PostController";
import { verifyToken } from "../middlewares/authentication";
const router = Router();
router.post("/create", verifyToken, createPost);
router.get('/allPosts',verifyToken,fetchAll)
router.patch('/addLike',verifyToken,addLike)
router.post('/addcomment',verifyToken,addComment)
router.get("/fetchCommentByPost/:id",verifyToken,fetchCommentsbyPostId)
export default router;

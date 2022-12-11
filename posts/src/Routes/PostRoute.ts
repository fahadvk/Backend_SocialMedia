import { Request, Response, Router } from "express";
import { addComment,fetchCommentsbyPostId } from "../Controllers/CommentController";
import { addLike, createPost,fetchAll,UserPosts,UserInfo } from "../Controllers/PostController";
import { verifyToken } from "../middlewares/authentication";
const router = Router();
router.post("/create", verifyToken, createPost);
router.get('/allPosts',verifyToken,fetchAll)
router.patch('/addLike',verifyToken,addLike)
router.post('/addcomment',verifyToken,addComment)
router.get("/fetchCommentByPost/:id",verifyToken,fetchCommentsbyPostId)
router.get('/fetchUserPosts',verifyToken,UserPosts)
router.get("/getUserInfo",verifyToken,UserInfo)
export default router;

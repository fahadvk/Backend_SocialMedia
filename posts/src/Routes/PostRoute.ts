import { Request, Response, Router } from "express";
import { addComment,fetchCommentsbyPostId } from "../Controllers/CommentController";
import { addLike, createPost,fetchAll,UserPosts,DeletePost, hidePost, savePost, getSaved } from "../Controllers/PostController";
import { verifyToken } from "../middlewares/authentication";
const router = Router();
router.post("/create", verifyToken, createPost);
router.get('/allPosts',verifyToken,fetchAll)
router.patch('/addLike',verifyToken,addLike)
router.post('/addcomment',verifyToken,addComment)
router.get("/fetchCommentByPost/:id",verifyToken,fetchCommentsbyPostId)
router.get('/fetchUserPosts/:id',verifyToken,UserPosts)
router.delete("/deletePost/:id",verifyToken,DeletePost)
router.patch('/hidePost/:id',verifyToken,hidePost)
router.patch('/savepost/:id',verifyToken,savePost)
router.get('/getSavedPosts',verifyToken,getSaved)
export default router;

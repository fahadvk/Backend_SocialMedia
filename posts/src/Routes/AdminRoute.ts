import {  Router } from "express";
import { DeletePost, getReported } from "../Controllers/PostController";
import { adminAuth } from "../middlewares/authentication";
const router = Router();


router.get('/ReportedPosts',adminAuth,getReported)
router.delete("/deletePost/:id",adminAuth,DeletePost)

export default router;

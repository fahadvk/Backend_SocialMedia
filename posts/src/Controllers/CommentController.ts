import { Request, Response } from "express"
import mongoose, { ObjectId } from "mongoose";
import { createComment, fetchCommentByPost } from "../Models/postRepository"


export const addComment = async (req:Request,res:Response)=>{
    console.log(req.body);
    const {id} = req.body.user
    const {content,postid} = req.body.data
 const response =   await createComment(content,postid,id)
 res.status(201).send('success')
}
export const fetchCommentsbyPostId =async (req:Request,res:Response) => {
    const id:string = req.params.id
 const response = await fetchCommentByPost(id)
res.status(200).send(response)
}
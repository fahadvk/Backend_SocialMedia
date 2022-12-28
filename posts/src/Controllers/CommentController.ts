import { Request, Response } from "express"
import { createComment, fetchCommentByPost } from "../Models/PostRepository"
import Websocket from "../WebSockets/Websockets";


export const addComment = async (req:Request,res:Response)=>{
    console.log(req.body);
    const {id} = req.body.user
    const {content,postid} = req.body.data
 const response =   await createComment(content,postid,id)
 if(response){
   const io = Websocket.getIo().emit('comment',{action:'create',post:response})
     res.status(201).send('success')
 }
}
export const fetchCommentsbyPostId =async (req:Request,res:Response) => {
    const id:string = req.params.id
 const response = await fetchCommentByPost(id)
res.status(200).send(response)
}
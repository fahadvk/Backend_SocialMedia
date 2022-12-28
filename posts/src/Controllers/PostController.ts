import { Request, Response } from "express";
import PostModel, { hidePost as Hide, viewAll,fethPostsByUser,DeletePost as PostDelete } from "../Models/PostRepository";
import { addLike as like  } from "../Models/PostRepository";
import { GetSavedPosts, SavePost } from "../Models/SavedPosts";
export const createPost = async (req: Request, res: Response) => {
  console.log(req.body, "ldkd");
  const { caption, image } = req.body;
  const { id } = req.body.user;
  const Post = new PostModel({
    caption,
    image,
    userid: id,
  })
    .save()
    .then((data) => {
      res.status(201).send({ success: true, data: data });
    });
};
export const fetchAll = async (req: Request, res: Response) => {
  const response = await viewAll(req.body.user.id);
  console.log(response)
  res.status(200).send(response);
};


export const addLike =async (req:Request,res:Response) => {
  console.log(req.body);
  const { id } = req.body.user;
  const {postid} = req.body
const response =  await like(postid,id)
console.log(response,"res");
res.status(200).send("success")
}
export const UserPosts =async (req:Request,res:Response) => {
  const response = await fethPostsByUser(req.params.id)  
  res.status(200).send(response)
}

export const DeletePost = async (req:Request,res:Response) =>{
  try {
   await PostDelete(req.params.id)
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(402)
  }
}
 
export const hidePost = async (req:Request,res:Response) =>{
  try {
 const response =   await Hide(req.params.id,req.body.user.id)
 if(response) return res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const savePost = async(req:Request,res:Response) =>{
  try {
    const response = await SavePost(req.params.id,req.body.user.id)
  } catch (error) {
    
  }
}

export const getSaved = async (req:Request,res:Response) =>{
  try {
    const response = await GetSavedPosts(req.body.user.id)
    console.log(response,"ppppp");
    res.json(response)
  } catch (error) {
    res.send(501)
  }
}
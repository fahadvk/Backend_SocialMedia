import { Request, Response } from "express";
import { createPost as Create } from "../Models/postModel";

export const createPost = async (req: Request, res: Response) => {
  console.log(req.body, "ldkd");
  const { caption, image } = req.body;
  const { id } = req.body.user;
  const Post = {
    caption,
    image,
    userid: id,
  };
 const response = await Create(Post);
  
};

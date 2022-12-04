import { Request, Response } from "express";
import PostModel, { viewAll } from "../Models/postRepository";

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
  const response = await viewAll();
  console.log(response)
  res.status(200).send(response);
};

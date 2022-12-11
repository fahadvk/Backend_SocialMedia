import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import { createUser, findUser, loginuser } from "../Models/userModel";
import { emailVerification } from "../Utils/SendEmail";

const SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY;
const signToken = (id: ObjectId, email: string) => {
  if (SECRET_KEY) {
    const token = Jwt.sign({ id, email }, SECRET_KEY, {
      expiresIn: process.env.Jwt_Expiresin,
    });
    return token;
  }
};
export const signup = async (req: Request, res: Response) => {
  const exist = await findUser(req.body.body.email);
  if (exist) return res.send("user Already exist");
 // const resp = await emailVerification(req.body.body.email)

  const response = await createUser(req.body.body);
  if (response) {
    const { _id, email, name } = response;
    const token = signToken(_id, email);
    return res.status(201).json({ token, name });
  }
  res.sendStatus(401);
};

export const login = async (req: Request, res: Response) => {
  const response = await loginuser(req.body);
  if (response.failed) {
    return res.status(501).json(response);
  }
  const { _id, email, name } = response;
  if (_id) {
    const token = signToken(_id, email);
    return res.status(200).json({ token, name });
  }
};
export const sendVerify = async (req: Request, res: Response) => {
  return res.send(req.body.user);
};

import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import { changeUserPassword, createUser, findUser, findUserwithPassword, loginuser } from "../Models/userModel";
import { emailVerification } from "../Utils/SendEmail";
import { comparePass, hashPassword } from "./passwords";

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
export const UserInfo =async (req:Request,res:Response) => {
  const response = await findUser(req.body.user.email)
  console.log(response);
  res.status(200).send(response)
}
export const verifyPassword = async(req:Request,res:Response)=>{
  const user = await findUserwithPassword(req.body.user.id)
  if (user)
  { console.log(req.body.password);
    const valid = await comparePass(user.password,req.body.password)
    if(valid) return res.sendStatus(200)
    res.sendStatus(401)
  }
    
}
export const changePassword = async (req:Request,res:Response)=>{
  const hashedpassword:Promise<string|undefined> = hashPassword(req.body.password)
if(hashedpassword) return await changeUserPassword(hashedpassword,req.body.user.id)
  
}
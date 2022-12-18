import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import { changeUserPassword, createUser, deleteAccount, findUser, findUserbyId, findUserwithPassword, loginuser, updateUserDetails } from "../Models/userModel";
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
    return res.status(200).json({ token, name,_id });
  }
};
export const sendVerify = async (req: Request, res: Response) => {
  return res.send(req.body.user);
};
export const UserInfo =async (req:Request,res:Response) => {
  // const response = await findUser(req.body.user.email)
  const response = await findUserbyId(req.params.id)
  if(!response) return res.sendStatus(404)
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
 hashPassword(req.body.password).then(async(hashedpassword)=>{
   if(hashedpassword) 
   { await changeUserPassword(hashedpassword,req.body.user.id)
    res.status(200).send("password changed")
   }

  })
  
}
export const changeUserInfo = async (req:Request,res:Response) =>{
  const response = await updateUserDetails(req.body.user.id,req.body.data)
  res.status(200).send(response)
}

export const deleteUser = async (req:Request,res:Response) =>{
  const response = await deleteAccount(req.body.user.id)
  if(response) return res.status(200).send("deleted success")
}
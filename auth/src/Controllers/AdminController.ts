
import { Request, Response } from "express"
import { ObjectId, Schema, Types } from "mongoose";
import {comparePass} from './passwords'
import adminModel from "../Models/AdminModel"
import { signToken } from "./authentication"
import { getAllUsers, User } from "../Models/UserModel";

  
  export interface Admin{
    UserName:string,
    Password:string,
    _id?:ObjectId
  }
export const adminLogin =async (req:Request,res:Response) => {
    const {UserName,Password} = req.body
    console.log(UserName,Password);
   const valid:Admin | null =await adminModel.findOne({UserName:UserName})
   console.log(valid);             
   if(valid?.Password && valid._id)
   {
    const checkPassword = await comparePass(valid?.Password,Password)
    console.log(checkPassword);
     if(checkPassword) 
     {
      const token =  signToken(valid?._id,valid.UserName)
      res.cookie('Admintoken',token,{path:'/'})
      return res.send(token)
     }
   } 
   return res.sendStatus(401)

}

export const fetchUserDetails =async (req:Request,res:Response) => {
    const page  =req.query.page
    const item_perPage = 5
   const TotalUsers =await User.find().countDocuments()
   if( typeof page === 'string' ) {
    {
    const Users = await getAllUsers(parseInt(page),item_perPage) 
    console.log(Users);
    res.status(200).json({Users,TotalUsers})
   }   
}
}
export const sendAdminVerify =async (req:Request,res:Response) => {
    const isValid = await adminModel.findById(req.body.user.id)
    if(isValid) return res.send('verified')
    res.sendStatus(401)
}

export const BlockUser = async(req:Request,res:Response)=>{
    const {userId} = req.body
   // const response = await User.findByIdAndUpdate(new Types.ObjectId(userId),{})
    const user = await User.findById(userId)
    console.log(user?.isBlocked,"blooo",);
    if(user)
    {
     user.isBlocked = !user.isBlocked
    await user.save()
    res.status(200).send(user)
    }
    
}
import {Request,Response} from 'express'
import { addProfileImage, editCover, FollowUser } from '../Models/userModel'

export const editProfileImage = async(req:Request,res:Response)=>{
 const response = await addProfileImage(req.body.user.id,req.body.imgurl)
 if(response)return res.status(200).send('successfully-edited')
 res.sendStatus(402)
}
 export const editCoverImage =async (req:Request,res:Response) => {
    const response = await editCover(req.body.user.id,req.body.imgurl)
console.log(response);
    if(response) return res.status(200).send('success')
    res.sendStatus(402)
 }

 export const followUser = async(req:Request,res:Response) =>{
    const response = await FollowUser(req.params.id,req.body.user.id)
    res.json(response)
 }

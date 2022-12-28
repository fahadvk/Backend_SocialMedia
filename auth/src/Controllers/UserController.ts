import  {Request,Response} from 'express'
import { findallUsers, followedUsersList, followingUsersList, GetSuggestedUsers, SavePost, searchUser } from '../Models/userModel'

export const SearchUser = async (req:Request,res:Response) =>{
    const response = await searchUser(req.params.search,req.body.user.id)
    console.log(response);
    if(response) return res.status(200).send(response)
    res.sendStatus(204)
}
export const findAllUsers =async (req:Request,res:Response) => {
    const response = await findallUsers(req.body.user.id)
    if(response) return res.status(200).send(response)  
    
}
export const findFollowingUsers = async (req:Request,res:Response) =>{
    const response = await followingUsersList(req.body.user.id)
    res.json(response)
}
export const findFollwedUsers = async (req:Request,res:Response) =>{
    const response = await followedUsersList(req.body.user.id)
    res.json(response)
}
export const SavePostintoUser = async (req:Request,res:Response) =>{
    const response = await SavePost(req.params.id,req.body.user.id)
    if(response) res.json(response)
}

export const getSuggested = async (req:Request,res:Response) =>{
    const response = await GetSuggestedUsers(req.body.user.id)
    if(response) res.json(response)
}
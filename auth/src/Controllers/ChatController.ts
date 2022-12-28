import { Request,Response } from "express"
import { CreateChat,getChatByUserId,FindChat } from "../Models/ChatModel"


export const createChat = async(req:Request,res:Response)=>{
    const response = await CreateChat(req.body.senderId,req.body.recieverId)
    if(response) return res.status(201).send(response)
    res.sendStatus(500)
}


export const userChats = async (req:Request,res:Response) =>{
    const response = await getChatByUserId(req.body.user.id)
    console.log(response,'----------------------');
    if(response) return res.status(200).json(response)
    res.sendStatus(500)
}

export const findChat  = async(req:Request,res:Response) =>{
    const response =  await FindChat(req.params.firstId,req.params.secondId)
    if(response) return res.status(200).send(response)
    res.sendStatus(500)
}
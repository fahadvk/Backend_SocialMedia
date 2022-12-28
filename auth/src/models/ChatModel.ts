import  { Schema, model, Types, ObjectId, Date } from "mongoose";
interface Ichat{
    Name:string,
    Users:[],
    LatestMessage:ObjectId,

}

const ChatSchema = new Schema<Ichat>({
  Name:String,
  Users:[{type:Schema.Types.ObjectId,ref:'users'}],
  LatestMessage:{type:Schema.Types.ObjectId,ref:'Messages'}
},{timestamps:true})
  
const ChatModel = model<Ichat>('Chat',ChatSchema)



export const CreateChat = async(sender:string,reciever:string) =>{
  try {
    const newChat = new ChatModel({Users:[new Types.ObjectId(sender),new Types.ObjectId(reciever)]})
    return await newChat.save()
  } catch (error) {
    console.log(error);
    return undefined
  }
}

export const getChatByUserId = async (userId:string) =>{
  try {
  // return await ChatModel.find({Users:{$in:[new Types.ObjectId(userId)]}})
  return await ChatModel.aggregate([{$match:{Users:new Types.ObjectId(userId)}},
  {$lookup:{localField:'Users',
foreignField:'_id',
from:'users',
as:'Users',
pipeline:[{
  $match:{
     _id:{ $ne:new Types.ObjectId (userId)}
  }
},{
  $project:{
    password:0,
    following:0,
    followers:0
  }
}]
}},{
  $unwind:{
    path:'$Users'
  }
}])
  } catch (error) {
    console.log(error,"dkkkkkkkkk");
    return undefined
  }
}

export const FindChat = async (firstuser:string,seconduser:string) =>{
  try {
    return await ChatModel.findOne({Users:{$all:[new Types.ObjectId(firstuser),new Types.ObjectId(seconduser)]}})
  } catch (error) {
    return undefined
  }
}
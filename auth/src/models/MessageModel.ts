import { Schema,model,ObjectId,Types } from "mongoose";

interface Imessage{
    sender:ObjectId,
    reciever:ObjectId,
    Chat:ObjectId,
    text:string
}

const messageSchema = new Schema<Imessage>({
    sender:{type:Schema.Types.ObjectId,ref:'Users',required:true},
    reciever:{type:Schema.Types.ObjectId,ref:'Users'},
    Chat:{type:Schema.Types.ObjectId,ref:'Chats',required:true},
    text:{type:String}

},{timestamps:true})
const MessageModel = model<Imessage>('Messages',messageSchema)

export const createMessage = async (chatId:string,sender:string,text:string) =>{
    try {
         return await new MessageModel ({Chat: new Types.ObjectId(chatId),sender,text}).save()
    } catch (error) {
        console.log(error);
      return undefined  
    }

}

export const GetMessagesByChatId =async (chatid:string) => {
    return await MessageModel.find({Chat:new Types.ObjectId(chatid)})
}
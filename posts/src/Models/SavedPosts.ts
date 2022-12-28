 import mongoose, { model, Model, ObjectId, Schema } from "mongoose";
import { savePostsendtoqueue } from "../utils/Send";

 interface IsavedPost {
    userId:ObjectId,
    posts:[ObjectId],

 }
  const SavedPostSchema = new Schema<IsavedPost>({
    userId:mongoose.Types.ObjectId,
    posts:[{type:mongoose.Types.ObjectId}],
  })
  const SavedPost = model<IsavedPost>('SavedPosts',SavedPostSchema)

export const SavePost = async(postid:string,userId:string) =>{
  const exist = await SavedPost.findOne({$and:[{userId:userId},{posts:postid}]})
  console.log(exist);
  if(exist)  return await SavedPost.findOneAndUpdate({userId:new mongoose.Types.ObjectId(userId)},{$pull:{posts:postid}})
 const res =  await SavedPost.findOneAndUpdate({userId:new mongoose.Types.ObjectId(userId)},{$addToSet:{posts:postid}})
 console.log(res,"res");
 if(!res)
 {
   const model = await SavedPost.create({userId,posts:[postid]})
   console.log(model);
    savePostsendtoqueue(model)
 }

}
export const GetSavedPosts = async (id:string) =>{
try {
  // return await SavedPost.findOne({userId:new mongoose.Types.ObjectId(id)}).populate('posts')
  return await SavedPost.aggregate([{$match:{userId:new mongoose.Types.ObjectId(id)}},
      {
        '$lookup': {
          'from': 'posts', 
          'localField': 'posts', 
          'foreignField': '_id', 
          'as': 'posts'
        }
      }, {
        '$unwind': {
          'path': '$posts'
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'posts.userid', 
          'foreignField': '_id', 
          'as': 'userid',
          pipeline:[{
            $project:{
              password:0
            }}]
        }
      }, {
        '$unwind': {
          'path': '$userid'
        }
      }
    ])
   
        
    
} catch (error) {
  console.log(error);
}
}
  export default SavedPost
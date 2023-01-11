import mongoose, { Schema, model, ObjectId, isValidObjectId, Mongoose, Types } from "mongoose";
import SavedPost from "./SavedPosts";
import UserModel from "./UserModel";
interface Ipost {
  userid: ObjectId;
  caption: string;
  image: string;
  comments: [{ content: string; userId: ObjectId }];
  isDeleted:boolean
  likedusers:[]
  hiddenUsers:[]
  reportedUsers:[]
 
}

const PostSchema = new Schema<Ipost>(
  {
    userid: { type: mongoose.Types.ObjectId,ref:'users' },
    caption: { type: String },
    image: { type: String },
    comments: [{ content:{type: String}, userId:{type: mongoose.Types.ObjectId},date:{type:Date,default:new Date()},replies:[{content:{type:String},userId:{type:mongoose.Types.ObjectId},date:{type:Date,default:new Date()}}],likes:[{type:mongoose.Types.ObjectId}] }],
    reportedUsers:[{ type:mongoose.Types.ObjectId} ] ,
    likedusers:[{type:mongoose.Types.ObjectId}] , 
    isDeleted:{type:Boolean,default:false},
    hiddenUsers:[{type:mongoose.Types.ObjectId}]
  },
  { timestamps: true }
);




const PostModel = model<Ipost>("Post", PostSchema);
export const viewAll = async function (userid:string) {
  const user = await UserModel.findById(userid,'following')
    const following = user?.following
    console.log(following);
  let savedPosts:any = await SavedPost.findOne({userId:userid},'posts userid')
  savedPosts = savedPosts ? savedPosts:{posts:[]}
  console.log(savedPosts);
  return await PostModel.aggregate([
{
 $match:{
  isDeleted:false,
  hiddenUsers:{$nin:[new mongoose.Types.ObjectId(userid)]},
  $or:[{userid:new Types.ObjectId(userid)},{userid:{$in:following}}]
 }
},
    {
      '$lookup': { 
        'from': 'users', 
        'localField': 'userid', 
        'foreignField': '_id', 
        'as': 'userid'
      }
    }, {
      '$unwind': {
        'path': '$userid'
      }
    },
    {
      '$lookup': {
          'from': 'savedposts', 
          'localField': 'userid.savedPosts', 
          'foreignField': '_id', 
          'as': 'savedposts', 
          'pipeline': [
              {
                  '$project': {
                      'posts': 1
                  }
              }
          ]
      }
},
{
  '$unwind': {
      'path': '$savedposts'
  }
},
    {
      '$project': {
        'comments': 1, 
        'createdAt': 1, 
        'userid.name': 1, 
        'userid.profileImage':1,
        'userid._id':1,
        'caption': 1, 
        'image': 1, 
        'reactions': 1, 
         'likedusers':1,
        'isliked': {
          '$in': [
         new mongoose.Types.ObjectId(userid), '$likedusers'
          ]
        },
        'isSaved': {
          '$in': [
              '$_id',savedPosts?.posts
          ]
      }
      }
    },{
      '$sort':{ 
        'createdAt':-1
      }
    }
  ])
};
export const addLike =async (post:string,user:string) => {
const User = new mongoose.Types.ObjectId(user)
const exist = await PostModel.find({$and:[{_id:post},{likedusers:User}]})
 if(exist.length === 0)  return  await PostModel.findOneAndUpdate({_id:post},{$push:{likedusers:user}},{new:true})
 return await PostModel.findOneAndUpdate({_id:post},{$pull:{likedusers:User}})
}
 

export  const createComment =async (content:string,postid:string,userId:string) => {
const id = new mongoose.Types.ObjectId(userId)
const comment = {content,userId:id,date:new Date()}
try {
   await PostModel.findOneAndUpdate({_id:postid},{$push:{comments:comment}},{new:true})
const response = fetchCommentByPost(postid)

  return response
} catch (error) {
  return undefined
  console.log(error);
}

}

export const fetchCommentByPost = async(id:string) =>{
  return await PostModel.aggregate([{$match:{_id:new mongoose.Types.ObjectId(id)}},
    // ,{$project:{comments:1}},
    {"$unwind":{
      path:'$comments'
    }},
    {"$lookup":
      {"from":"users",
       "localField":"comments.userId",
       "foreignField":'_id',
       "as":'username',
       "pipeline":[{
  $project:{
    name:1
  }
      }]
}},
{
  '$unwind':{
    path:'$username'
  }
},{
  $project:{
    username:1,
    comments:1,
    createdAt:1
  }
}
])
 
}
 export const fethPostsByUser =async (id:string) => { 
 return await PostModel.aggregate([
  {
    $match:{
      userid:new mongoose.Types.ObjectId(id),
      isDeleted:false
    }
  },
  {
      '$lookup': {
        'from': 'users', 
        'localField': 'userid', 
        'foreignField': '_id', 
        'as': 'userid'
      }
    }, {
      '$unwind': {
        'path': '$userid'
      }
    }, {
      '$project': {
        'comments': 1, 
        'createdAt': 1, 
        'userid.name': 1, 
        'caption': 1, 
        'image': 1, 
        'reactions': 1, 
        'isliked': {
          '$in': [
     new mongoose.Types.ObjectId(id), '$likedusers'
          ]
        }
      }
    },{
      '$sort':{
        'createdAt':-1
      }
    }
  ])
 }


 export const DeletePost =async (id:string) => {
  try {
       return await PostModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id),{isDeleted:true})
  } catch (error) {
     console.log(error); 
  }
  
 }
 export const hidePost =async (id:string,userId:string) =>{
  try {
       return await PostModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id),{$addToSet:{hiddenUsers:new mongoose.Types.ObjectId(userId)}})
  } catch (error) {
    console.log(error);
  }
 }

 export const findPostById = async(id:string,userId:string) =>{
  try {  
    // return await PostModel.findById(new Types.ObjectId(id))
    return  await PostModel.aggregate([
      {
        $match:{
         _id:new Types.ObjectId(id),
          isDeleted:false
        }
      },
      {
          '$lookup': {
            'from': 'users', 
            'localField': 'userid', 
            'foreignField': '_id', 
            'as': 'userid'
          }
        }, {
          '$unwind': {
            'path': '$userid'
          }
        }, {
          '$project': {
            'comments': 1, 
            'createdAt': 1, 
            'userid.name': 1, 
            'caption': 1, 
            'image': 1, 
            'reactions': 1, 
            'isliked': {
              '$in': [
         new mongoose.Types.ObjectId(userId), '$likedusers'
              ]
            }
          }
        }
      ])
  } catch (error) {
    throw error
  }
 }
 export const reportPost = async(id:string,userId:string)=>{
  try {
    return await PostModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id),{$addToSet:{reportedUsers:userId}})
  } catch (error) {
     return null  
  }
 }

export default PostModel;

import mongoose, { Schema, model, ObjectId, Date } from "mongoose";
import { hashPassword, comparePass } from "../Controllers/passwords";

interface IUser {
  name: string;
  email: string;
  password: string;
  mobile: number;
  _id: ObjectId;
  followers:[ObjectId],
  following:[ObjectId],
  profileImage:string,
  coverImage:string,
  Dob:Date,
  gender:string,
  isGuser:boolean,
  isVerified:boolean,
  savedPosts:ObjectId,
  about:string,
  isDeleted:boolean,
  isAdmin:boolean,
  isBlocked:boolean

}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    mobile:{type:Number,required:true},
    followers:[{type:mongoose.Types.ObjectId}],
    following:[{type:mongoose.Types.ObjectId}],
    coverImage:{type:String},
    profileImage:{type:String},
    gender:{type:String},
    Dob:{type:Date},
    isGuser:{type:Boolean,default:false},
    isVerified:{type:Boolean,default:false},
    savedPosts:{type:mongoose.Types.ObjectId},
    about:{type:String},
    isDeleted:{type:Boolean,default:false},
    isBlocked:{type:Boolean, default:false}

  },
  { timestamps: true }
);

// 3. Create a Model.
export const User = model<IUser>("User", userSchema);

export const createUser = async (data: IUser) => {
  console.log(data);
  const { name, mobile, password, email } = data;
  try {
    const hashedpassword = await hashPassword(password);
    const user = new User({
      name,
      mobile,
      password: hashedpassword,
      email,
    });
    const newUser = await user.save();
    // const user = await User.create(data)

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const loginuser = async (data: IUser) => {
  try {
    const email = data.email;
    const user = await User.findOne({$and:[{ email: email },{isDeleted:false}]}).select("+password");
    if (user) {
      const response = await comparePass(user.password, data.password);
      const { email, name, _id } = user;
      if (response) return { email, _id, name };
      else {
        return { failed: true, message: "incorrect password" };
      }
    } else {
      return { failed: true, message: "user does not exist" };
    }
  } catch (error) {
    return { failed: true, message: "user does not exist" };
  }
};
export const findUser = async (email: string) => {
  try {
    const user = User.findOne({ email: email });
    return user;
  } catch (error) {
    console.log(error)
  }
};
export const findUserwithPassword = async(_id:string)=> await User.findById(new mongoose.Types.ObjectId(_id)).select('+password')
 export const editCover =async (id:string,url:string) => {
    return await User.findOneAndUpdate({_id:id},{coverImage:url},{new:true})
 }
   
 export const addProfileImage = async (id:string,url:string) => {
  return await User.findOneAndUpdate({_id:id},{profileImage:url})
 }
 export const changeUserPassword = async (password:string,id:string) =>{
  return await User.findOneAndUpdate({_id:new mongoose.Types.ObjectId(id)},{password})
 }
  

 export const updateUserDetails = async(id:string,update:IUser) =>{
  return await  User.findOneAndUpdate({_id:new mongoose.Types.ObjectId(id)},{$set:update})
 }

 export const deleteAccount = async(id:string) =>{
  return await User.findByIdAndUpdate(new mongoose.Types.ObjectId(id),{isDeleted:true})
 }
  
 export const findUserbyId = async (id:string) =>{
  return await User.findById(new mongoose.Types.ObjectId(id))
 }

 export const searchUser =async (data:string,id:string) =>{
  return await User.find({$and:[{isAdmin:{$ne:true}},{name:{'$regex': new RegExp(data),$options:'si'}},{_id:{$ne: new mongoose.Types.ObjectId(id)}}]})
 }
 export const findallUsers =async(id:string)=>{
  // return await User.find({})
  return await User.aggregate([
    {
      $match:{
       _id:{$ne:new mongoose.Types.ObjectId(id)}
      }
    },{$project:{
     'name':1,
     'profileImage':1,
     'coverImage':1,
     'about':1,
    'isFollowed':{
      '$in':[ new mongoose.Types.ObjectId(id),'$followers']
    }
  }}])
 }

 export const followingUsersList = async(id:string)=>{
  return await User.aggregate([{
    $match:{
      _id:new mongoose.Types.ObjectId(id)
    }
  },
    {
  $lookup:{
    from:'users',
    localField:'following',
    foreignField:'_id',
    as:'following',
    pipeline:[{
      $project:{
        name:1,
        profileImage:1,
        coverImage:1,
        about:1,
        'isFollowed':{
          '$in':[ new mongoose.Types.ObjectId(id),'$followers']
        }
      }
          }]
  }
    },{
      $project:{
        following:1,
        name:1,

      }
    }
  ])
 }

 export const followedUsersList = async(id:string)=>{
  return await User.aggregate([{
    $match:{
      _id:new mongoose.Types.ObjectId(id)
    }
  },
    {
  $lookup:{
    from:'users',
    localField:'followers',
    foreignField:'_id',
    as:'followers',
    pipeline:[{
      $project:{
        name:1,
        profileImage:1,
        coverImage:1,
        about:1
      }
          }]
  }
    },{
      $project:{
        followers:1,
        name:1,
      }
    }
  ])
 }


 export const FollowUser = async(followUser:string,userid:string)=>{
 try {
const exist = await User.find({$and:[{_id:new mongoose.Types.ObjectId(userid)},{following:new mongoose.Types.ObjectId(followUser)}]})
  if(exist.length) {
    const response =  await  User.findOneAndUpdate({_id:new mongoose.Types.ObjectId(userid)},{$pull:{following:new mongoose.Types.ObjectId(followUser)}},{new:true})
    await User.findOneAndUpdate({_id:new mongoose.Types.ObjectId(followUser)},{$pull:{followers:userid}},{new:true}) 
    return response
  }
  const response =  await  User.findOneAndUpdate({_id:new mongoose.Types.ObjectId(userid)},{$push:{following:new mongoose.Types.ObjectId(followUser)}},{new:true})
    await User.findOneAndUpdate({_id:new mongoose.Types.ObjectId(followUser)},{$push:{followers:new mongoose.Types.ObjectId(userid)}},{new:true}) 
    return response
 } catch (error) {
  return undefined
 }
 }

 export const SavePost = async(postid:string,useId:string)=>{
 try {
  await User.findByIdAndUpdate(new mongoose.Types.ObjectId(useId),{$addToSet:{savedPosts:new mongoose.Types.ObjectId(postid)}})
 } catch (error) {
  return undefined
 }
 }


 export  const GetSuggestedUsers = async(userId:string)=>{
 const user = await User.findById(new mongoose.Types.ObjectId(userId),'following')
  const following = user?.following
 if(user)  following?.push(user?._id)
 const response = await User.find({_id:{$nin:following}},'name about profileImage coverImage ').limit(3)
 return response
 }

 export const getAllUsers =async (page:number,itemperPage:number) => {
  try {
    return await User.find().skip((page-1) * itemperPage).limit(itemperPage)
  } catch (error) {
    console.log(error);
    return undefined
  }
 }
import { model, Schema, Types } from "mongoose";

const UserModel = model('User', 
new Schema({ name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  mobile:{type:Number,required:true},
  followers:[{type:Types.ObjectId}],
  following:[{type:Types.ObjectId}],
  coverImage:{type:String},
  profileImage:{type:String},
  gender:{type:String},
  Dob:{type:Date},
  isGuser:{type:Boolean,default:false},
  isVerified:{type:Boolean,default:false},
  savedPosts:{type:Types.ObjectId},
  about:{type:String},
  isDeleted:{type:Boolean,default:false},
  isBlocked:{type:Boolean, default:false}}), 
'users'); 
export default UserModel
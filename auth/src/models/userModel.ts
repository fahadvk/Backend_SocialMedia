import mongoose, { Schema, model, connect, ObjectId } from "mongoose";
import { hashPassword, comparePass } from "../Controllers/passwords";

// 1. Create an interface representing a document in MongoDB.
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
  Dob:string,
  gender:string,
  isGuser:boolean,
  isVerified:boolean,
  savedPosts:[ObjectId],
  about:string

}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    followers:[{type:mongoose.Types.ObjectId}],
    following:[{type:mongoose.Types.ObjectId}],
    coverImage:{type:String},
    profileImage:{type:String},
    gender:{type:String},
    Dob:{type:String},
    isGuser:{type:Boolean,default:false},
    isVerified:{type:Boolean,default:false},
    savedPosts:[{type:mongoose.Types.ObjectId}],
    about:{type:String}

  },
  { timestamps: true }
);

// 3. Create a Model.
const User = model<IUser>("User", userSchema);

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
    const user = await User.findOne({ email: email }).select("+password");
    if (user) {
      const response = await comparePass(user.password, data.password);
      const { email, name, _id } = user;
      if (response) return { email, _id, name };
      else {
        return { failed: true, message: "incorrect password" };
      }
    } else {
      return { failed: true, message: "user not exist" };
    }
  } catch (error) {
    return { failed: true, message: "user not exist" };
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

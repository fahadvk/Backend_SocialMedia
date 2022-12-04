import mongoose, { Schema, model, ObjectId } from "mongoose";
interface Ipost {
  userid: ObjectId;
  caption: string;
  image:string;
  comments: [{ content: string; userId: ObjectId }];
  reactions: [{ type: string; userId: ObjectId }];
  methods:{
     createPost: () => {};
  }
}

const PostSchema = new Schema<Ipost>({
  userid: { type: mongoose.Types.ObjectId },
  caption: { type: String },
  image:{type:String},
  comments: { type: [{ content: String, userId: mongoose.Types.ObjectId }] },
  reactions: { type: [{ type: String, userId: mongoose.Types.ObjectId }] },
  
});
PostSchema.methods.createPost = async(data: any) => {
  return await mongoose.model('Post').create(data);
};

const PostModel = model<Ipost>("Post", PostSchema);

export const createPost = async(data: any) => {
  await PostModel.create(data).then(()=>{return true}).catch(()=>{return false})
};
export default PostModel;

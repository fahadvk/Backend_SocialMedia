import mongoose, { Schema, model, ObjectId } from "mongoose";
interface Ipost {
  userid: ObjectId;
  text: string;
  comments: [{ content: string; userId: ObjectId }];
  reactions: [{ type: string; userId: ObjectId }];
  methods:{
     createPost: () => {};
  }
}

const PostSchema = new Schema<Ipost>({
  userid: { type: mongoose.Types.ObjectId },
  text: { type: String },
  comments: { type: [{ content: String, userId: mongoose.Types.ObjectId }] },
  reactions: { type: [{ type: String, userId: mongoose.Types.ObjectId }] },
  
});
PostSchema.methods.createPost = async(data: any) => {
  return await mongoose.model('Post').create(data);
};

const PostModel = model<Ipost>("Post", PostSchema);

export const createPost = (data: any) => {
  PostModel.create(data);
};
export default PostModel;

import mongoose, { Schema, model, ObjectId } from "mongoose";
interface Ipost {
  userid: ObjectId;
  caption: string;
  image: string;
  comments: [{ content: string; userId: ObjectId }];
  reactions: [{ type: string; userId: ObjectId }];
  methods: {
    createPost: () => {};
  };
}

const PostSchema = new Schema<Ipost>(
  {
    userid: { type: mongoose.Types.ObjectId },
    caption: { type: String },
    image: { type: String },
    comments: { type: [{ content: String, userId: mongoose.Types.ObjectId }] },
    reactions: { type: [{ type: String, userId: mongoose.Types.ObjectId }] },
  },
  { timestamps: true }
);
PostSchema.methods.createPost = async (data: any) => {
  return await mongoose.model("Post").create(data);
};

const PostModel = model<Ipost>("Post", PostSchema);
export const viewAll = async function () {
  return await PostModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userid",
        foreignField: "_id",
        as: "userid",
      },
    },
    {
      $unwind: {
        path: "$userid",
      },
      
    },
    {
      $project:{
      'userid.password':0
      }
    },{
      $sort:{
        createdAt:-1
      }
    }
  ]);
};
export const addLike =async (post:ObjectId,user:ObjectId) => {
  //  await PostModel.find({_id:post{}})
 return  await PostModel.findOneAndUpdate({_id:post},{$addToSet:{userid:user}})
}

export default PostModel;

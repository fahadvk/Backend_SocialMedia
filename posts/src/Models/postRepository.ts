import mongoose, { Schema, model, ObjectId, isValidObjectId } from "mongoose";
interface Ipost {
  userid: ObjectId;
  caption: string;
  image: string;
  comments: [{ content: string; userId: ObjectId }];
  reactions: [{ type: string; userId: ObjectId }];
  likedusers:[]
  methods: {
    createPost: () => {};
  };
}

const PostSchema = new Schema<Ipost>(
  {
    userid: { type: mongoose.Types.ObjectId },
    caption: { type: String },
    image: { type: String },
    comments: [{ content: String, userId: mongoose.Types.ObjectId  }],
    reactions:[{ rtype:{ type: String}, userId: {type:mongoose.Types.ObjectId} }] ,
    likedusers:[]
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
 const exist =  await PostModel.find({$and:[{_id:post},{ reactions:{rtype:'like',userId:user} }]})
//  await PostModel.aggregate([{$match:{_Id:post}},{$unwind:{path:'$reactions'}},{$match:{'reactions.$.userid'=}}])
 console.log(exist,"dslk");
 console.log(post);
 const update = {rtype:'like',userId:user}
//  console.log(await PostModel.findOne({_id:post}));
//  if(exist.length === 0)  return  await PostModel.findOneAndUpdate({_id:post},{$push:{reactions:update}},{new:true})

}

export default PostModel;

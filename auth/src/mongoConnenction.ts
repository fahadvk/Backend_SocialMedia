import Mongoose from "mongoose";
async function run(){
 const connectionUrl = process.env.Mongo_Url || ""

    await Mongoose.connect(connectionUrl);
  }
  run().then((e)=>{console.log("run")}).catch((e) => console.log(e)) 

export default Mongoose;

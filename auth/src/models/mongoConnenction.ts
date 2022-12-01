import Mongoose from "mongoose";
try {
async function run(){
 const connectionUrl = process.env.Mongo_Url || ""

    await Mongoose.connect(connectionUrl);
  }
  run().then((e)=>{console.log("run")}).catch((e) => console.log(e)) 
} catch (error) {
  console.log(error);
}

export default Mongoose;

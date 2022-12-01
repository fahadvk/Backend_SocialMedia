import express from "express";
import cors from "cors";
import userRoute from './routes/userRoues'

import * as dotenv from 'dotenv'
import Mongoose from "./models/mongoConnenction";
import cookieParser from "cookie-parser"
dotenv.config()
const app = express();

app.use(cors({origin:process.env.Origin_Url,credentials:true}));
app.use(cookieParser())
app.use(express.json());

app.use("/",userRoute)
 const connection = Mongoose.connection;

app.listen(4000, () => {
  console.log("listening to 4000 port");
});

import express from "express";
import {createServer} from 'http'
import cors from "cors";
import {Server} from 'socket.io';
import socket from "./Sockets";
import cookieParser from "cookie-parser"
import config from 'config';
import userRoute from './routes/userRoues'
import chatRoute from './routes/chatRoute'
import adminRoute from './routes/AdminRoute'

import messageRoute from './routes/MessageRoutes'
import * as dotenv from 'dotenv'
import Mongoose from "./mongoConnenction";
import recieve from "./Utils/Recieve";
dotenv.config()
const app = express();
const corsOrigin = config.get<string>("Origin_Url")
app.use(cors({origin:corsOrigin,credentials:true}));
app.use(cookieParser())
app.use(express.json());
app.use("/",userRoute)
app.use('/chat',chatRoute)
app.use('/messages',messageRoute)
app.use('/admin',adminRoute)
const connection = Mongoose.connection;

const httpServer = createServer(app)
const io =  new Server (httpServer,{cors:{
  origin:corsOrigin,credentials:true
 }})


recieve().then(()=>{
  httpServer.listen(4000,()=>{
         socket({io})

    console.log("listening to 4000 port");
  })
 
}).catch((e)=>{
  console.log(e);
})







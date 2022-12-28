import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import userRoute from './routes/userRoues'
import chatRoute from './routes/chatRoute'
import messageRoute from './routes/MessageRoutes'
import Websocket from "./WebSocket/Socket"
import * as dotenv from 'dotenv'
import Mongoose from "./mongoConnenction";
import recieve from "./Utils/Recieve";
dotenv.config()
const app = express();

app.use(cors({origin:process.env.Origin_Url,credentials:true}));
app.use(cookieParser())
app.use(express.json());
app.use("/",userRoute)
app.use('/chat',chatRoute)
app.use('/messages',messageRoute)

const connection = Mongoose.connection;

let server
recieve().then(()=>{
 server =  app.listen(4000, () => {
    console.log("listening to 4000 port");
  }) 
}).catch((e)=>{
  console.log(e);
})

const io = Websocket.getInstance(server)
io.on('connection',socket =>{
   console.log('client connected');
})

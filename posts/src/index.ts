import  express  from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import config from 'config';
import { Socket } from "socket.io";
import {connect} from './mongoconnection'
import PostRoute from './Routes/PostRoute'
import AdminRoute from './Routes/AdminRoute'
import connectamqp from './utils/Rabbitmqconf'
import dotenv from 'dotenv'
import Websocket from "./WebSockets/Websockets";

dotenv.config()
const corsOrigin = config.get<string>("Origin_Url")
console.log(corsOrigin);
connect()
const origin =['https://audiozone.site' ,'http://localhost:5173']
const app = express()
app.use(cors({credentials:true,origin:origin})) 
app.use(express.json())
app.use(cookieParser())
app.use('/',PostRoute)
app.use('/admin',AdminRoute)

const port =process.env.PORT || 4001 
 let io
connectamqp().then((channel)=>{
const server = app.listen(port,()=>{
    console.log(`server listening to the ${port}`)

})
channel.on( 'error', function(err:any) {
    console.log('An error occurred' + err+'Errrror');
  });
 io = Websocket.getInstance(server)
 
io.on('connection',(socket:Socket) =>{
   console.log('client connected');
})
}).catch((e)=>console.log(e))
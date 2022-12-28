import  express  from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import {connect} from './mongoconnection'
import PostRoute from './Routes/PostRoute'
import connectamqp from './utils/Rabbitmqconf'
import dotenv from 'dotenv'
import Websocket from "./WebSockets/Websockets";

dotenv.config()
connect()
const app = express()
app.use(cors({credentials:true,origin:process.env.Origin_Url}))
app.use(express.json())
app.use(cookieParser())
app.use('/',PostRoute)


const port =process.env.PORT || 4001 
 let io
connectamqp().then((channel)=>{
const server = app.listen(port,()=>{
    console.log(`server listening to the ${port}`)
})
 io = Websocket.getInstance(server)
io.on('connection',socket =>{
   console.log('client connected');
})
})
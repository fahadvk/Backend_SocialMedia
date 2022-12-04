import  express  from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import {connect} from '../src/Models/mongoconnection'
import PostRoute from './Routes/PostRoute'
import dotenv from 'dotenv'
dotenv.config()
connect()
const app = express()
app.use(cors({credentials:true,origin:process.env.Origin_Url}))
app.use(express.json())
app.use(cookieParser())
app.use('/',PostRoute)


const port =process.env.PORT || 4001 
app.listen(port,()=>{
    console.log(`server listening to the ${port}`)
})
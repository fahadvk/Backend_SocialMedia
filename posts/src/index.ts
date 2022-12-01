import  express  from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())


const port =process.env.PORT || 4001 
app.listen(port,()=>{
    console.log(`server listening to the ${port}`)
})
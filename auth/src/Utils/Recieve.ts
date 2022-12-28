import { User } from '../Models/userModel';
import connectamqp from './Rabbitmqconf'
export default async function recieve(){
connectamqp().then((connection)=>{
     connection.createChannel((err1:any,Channel:any)=>{
        if(err1) 
        {  console.log(err1);
            throw err1
        }
        else{
            Channel.assertQueue('savepost',{durable:true})
            Channel.consume('savepost',async(msg:any)=>{
                const response = JSON.parse(msg?.content.toString())
                const userid = response["userId"]
                const id = response['_id']
               const res = await User.findOneAndUpdate({_id:userid},{savedPosts:id})
               console.log(res,"i",response,id,userid);
                    console.log(msg?.content.toString());
                },{noAck:true})
               Promise.resolve("success")  
        }
    })
})
}
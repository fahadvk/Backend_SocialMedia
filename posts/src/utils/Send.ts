
import connectamqp from './Rabbitmqconf'


export async function savePostsendtoqueue(data:any) {
   connectamqp().then((connection)=>{
  connection.createChannel((err1:any,Channel:any)=>{
           if(err1) 
           {
            //    reject(err1)
               throw err1
            }
            else{
                Channel.assertQueue('savepost',{durable:true})
                Channel.sendToQueue('savepost',Buffer.from(JSON.stringify(data)))
                console.log('send');
            }
        })
      
    })
}
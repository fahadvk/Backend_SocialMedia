import * as amqp from 'amqplib/callback_api'
 
export default function ampqp (){
    return new Promise<any>((resolve, reject) => {
        try {
          if(process.env.AmqpURL) amqp.connect(process.env.AmqpURL,(err0,connection)=>{
              if (err0)
              {
              reject(err0)
              // throw err0 
            } 
            else{
              resolve(connection)
            }
              // connection.createChannel((err1,Channel)=>{
              //     if(err1) 
              //     {
              //         reject(err1)
              //       throw err1
              //     }
              //     else{
              //       Channel.assertQueue('hello',{durable:true})
              //       Channel.consume('hello',(msg,)=>{
              //        console.log(msg?.content.toString());
              //       },{noAck:true})
              //       resolve(Channel)
              //     }
              // })
          })  
      } catch (error) {
      
        console.log(error,"err");
      }
    })
}

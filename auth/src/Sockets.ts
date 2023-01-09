// import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
// import logger from "./utils/logger";



function socket({ io }: { io: Server }) {
 console.log(`Sockets enabled`);
// type ActiveUsers=[{
// userId:string,
// socketId:string,
// }]
let ActiveUsers : any [] = []

 io.on('connection', (socket: Socket) => {
  

    console.log(`User connected ${socket.id}`);

   socket.on("new-user-add",(userId)=>{
    
     if(!ActiveUsers.some((user:any)=>user.userId === userId))
     {
       console.log('objectooo',userId);
      //  [...activeUsers,{userId,socketId:socket.id}]
    // ActiveUsers.push({userId,socketId:socket.id})
    ActiveUsers=[...ActiveUsers,{userId,socketId:socket.id}]
      //  activeUsers.push({userId,socketId:socket.id})

      }
    })
  socket.emit('get-users',ActiveUsers)

  socket.on('send-message',(data)=>{
    const {recieverId} = data
    const user =ActiveUsers.find((user)=>user.userId === recieverId)
    if(user) io.to(user.socketId).emit('recieve-message',data)
  })
  socket.on('disconnect',()=>{
  ActiveUsers = ActiveUsers.filter((user:any)=>user.socketId !== socket.id)
  })


  });
}

export default socket;
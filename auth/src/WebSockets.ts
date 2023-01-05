import ioserver,{Server} from 'socket.io'
const WEBSOCKET_CORS = {
    origin: "*",
    methods: ["GET", "POST"]
 }

 class Websocket extends Server {

    private static io: Websocket;
 
    constructor(httpServer:any) {
        super(httpServer, {
            cors: WEBSOCKET_CORS
        })
    }

    public static getInstance(httpServer:any): Websocket {

        if (!Websocket.io) {
            Websocket.io = new Websocket(httpServer);
        }
   return Websocket.io;
    }
    public static getIo(){
        if (!Websocket.io) {
            throw new Error('socket is not connected')
        }
   return Websocket.io;
    }
 }
 
 
 export default Websocket;
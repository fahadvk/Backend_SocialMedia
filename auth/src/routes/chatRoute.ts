import { Router } from "express";
import { createChat, findChat, userChats } from "../Controllers/ChatController";
import { userAuth } from "../Middlewares/authentication";

const router = Router()

router.post("/create",userAuth,createChat)
// router.get('/:chatId/allmessages',userAuth,getallChatsbyid)
router.get('/',userAuth,userChats)
router.get('/find/:firstId/:secondId',userAuth,findChat)
 export default router
import { Router } from "express";
import { addMessage, getMessage } from "../Controllers/MessageController";
const router = Router()

router.post( '/',addMessage)
router.get('/:chatId',getMessage)
export default router
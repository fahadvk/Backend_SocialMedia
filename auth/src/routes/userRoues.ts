import {Router} from 'express'
import { login ,signup,sendVerify} from '../Controllers/authentication'; 
import { userAuth } from '../Middlewares/authentication';

const router = Router()

router.post("/register",signup);
router.post("/login",login)
router.get('/verify',userAuth,sendVerify)

  export default router
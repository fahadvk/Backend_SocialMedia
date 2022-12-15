import {Router} from 'express'
import { login ,signup,sendVerify,UserInfo,verifyPassword,changePassword} from '../Controllers/authentication'; 
import { editProfileImage } from '../Controllers/Profile';
import { userAuth } from '../Middlewares/authentication';

const router = Router()

router.post("/register",signup);
router.post("/login",login)
router.get('/verify',userAuth,sendVerify)
router.get("/getUserInfo",userAuth,UserInfo)
router.patch('/editProfilePicture',userAuth,editProfileImage)
router.patch('/verifyPassword',userAuth,verifyPassword)
router.patch('/changePassword',userAuth,changePassword)

  export default router
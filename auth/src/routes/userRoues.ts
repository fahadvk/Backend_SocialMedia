import {Router} from 'express'
import { login ,signup,sendVerify,UserInfo,verifyPassword,changePassword, changeUserInfo, deleteUser} from '../Controllers/authentication'; 
import { editCoverImage, editProfileImage } from '../Controllers/Profile';
import { userAuth } from '../Middlewares/authentication';

const router = Router()

router.post("/register",signup);
router.post("/login",login)
router.get('/verify',userAuth,sendVerify)
router.get("/getUserInfo/:id",userAuth,UserInfo)
router.patch('/editProfilePicture',userAuth,editProfileImage)
router.patch('/editCoverPicture',userAuth,editCoverImage)
router.patch('/verifyPassword',userAuth,verifyPassword)
router.patch('/changePassword',userAuth,changePassword)
router.put('/updateUserInfo',userAuth,changeUserInfo)
router.delete('/user',userAuth,deleteUser)

  export default router
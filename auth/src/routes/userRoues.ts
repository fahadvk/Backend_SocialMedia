import {Router} from 'express'
import { login ,signup,sendVerify,UserInfo,verifyPassword,changePassword, changeUserInfo, deleteUser} from '../Controllers/authentication'; 
import { editCoverImage, editProfileImage, followUser } from '../Controllers/Profile';
import { findAllUsers, findFollowingUsers, findFollwedUsers, getSuggested, SavePostintoUser, SearchUser } from '../Controllers/UserController';
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
router.get('/:search/search',userAuth,SearchUser)
router.get("/findallUsers",userAuth,findAllUsers)
router.put('/followUser/:id',userAuth,followUser)
router.get('/getfollowing',userAuth,findFollowingUsers)
router.get('/getfollowed',userAuth,findFollwedUsers)
router.patch('/savepost/:id',userAuth,SavePostintoUser)
router.get('/getSuggestedUsers',userAuth,getSuggested)
  export default router
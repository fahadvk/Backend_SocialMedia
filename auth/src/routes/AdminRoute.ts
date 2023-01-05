import {Router} from 'express';

import { adminLogin, BlockUser, fetchUserDetails, sendAdminVerify } from '../Controllers/AdminController';
import { adminAuth } from '../Middlewares/authentication';
const router = Router()

router.post('/login',adminLogin)
router.get('/users',adminAuth,fetchUserDetails)
router.get('/verify',adminAuth,sendAdminVerify)
router.patch('/blockuser',adminAuth,BlockUser)
export default router
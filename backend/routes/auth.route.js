import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';

//controllers imports
import {signUp,login,logout,updateProfile} from '../controllers/auth.controller.js';

const router=express.Router();

//midlleware solving the Rate Limiting and bot detection using arcjet protection
// router.use(arcjetProtection);

router.post('/signUp',signUp);
router.post('/login',login);
router.post('/logout',logout);

router.put('/updateProfile',protectRoute,updateProfile);

router.get('/check',protectRoute,(req,res)=>res.status(200).json(req.user));

export default router;
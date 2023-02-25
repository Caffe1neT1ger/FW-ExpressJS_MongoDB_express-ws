import { Router } from "express";
import { registration,login,logout,refresh,activate,getUsers } from "../controllers/userController.js";
import { body } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";


const router = new Router();

router.post('/registration',body('email').isEmail(), body('password').isLength({min:6,max:32}),registration)
router.post('/login',login)
router.post('/logout',logout)
router.get('/activate/:link',activate)
router.get('/refresh',refresh);
router.get('/users',authMiddleware,getUsers);



export default router
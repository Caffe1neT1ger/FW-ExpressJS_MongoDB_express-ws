import {Router} from "express";
import { body } from "express-validator";
import { roomController } from "../controllers/roomController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const wsRouter = new Router()

// wsRouter.ws('/echo',authMiddleware,roomController)

export default wsRouter;
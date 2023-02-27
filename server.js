import dotenv from "dotenv";
import express from "express";
import enableWs from 'express-ws'
import cors from "cors";
import colors from "colors";
import cookieParser from "cookie-parser";

import { connectionDB } from "./config/db.js";

import router from "./router/index.js";
import wsRouter from "./router/wsRouter.js";

import errorMiddleware from "./middleware/errorMiddleware.js";
import { roomController } from "./controllers/roomController.js";

dotenv.config();

const app = express();
const WSServer = enableWs(app); 
const aWss = WSServer.getWss();
export default aWss
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", router);
// app.ws('/api/ws/',wsRouter)
app.ws('/api/ws',roomController)
app.use(errorMiddleware);
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectionDB();
    app.listen(PORT, () => {
      console.log(`Server running on port:${PORT}`.yellow.bold);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

import dotenv from "dotenv";
import express from "express";
import enableWs from 'express-ws'
import cors from "cors";
import colors from "colors";
import cookieParser from "cookie-parser";

import { connectionDB } from "./config/db.js";

import router from "./router/index.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", router);
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

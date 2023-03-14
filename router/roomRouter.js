import { Router } from "express";
// import roomController from "../controllers/roomController.js";
import { deleteRoom,removeSpectator,updateRoomData,showPrivateRooms,showPublicRooms,getRoom } from "../controllers/roomController.js";
const router = new Router();

router.post("/delete", deleteRoom);
router.post("/remove", removeSpectator);
router.post("/update", updateRoomData);
router.get("/public", showPublicRooms);
router.get("/private", showPrivateRooms);
router.get("/get-room", getRoom);

export default router

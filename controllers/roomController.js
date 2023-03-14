import roomService from "../service/roomService.js";

export const roomController = async function (ws, req) {
  ws.on("open", async function (message) {
    // const messageData = JSON.parse(message);
    // switch (messageData.type) {
    // }
  });
  ws.on("message", async function (message) {
    const messageData = JSON.parse(message);
    switch (messageData.method) {
      case "create":
        {
          await roomService.createRoom(ws, messageData);
        }

        break;
      case "connection":
        {
          await roomService.connection(ws, messageData);
        }
        break;
      case "watch":
        roomService.broadcastConnection(ws, messageData);
        break;
    }
  });
  ws.on("close", async function (ws, message) {
    // const messageData = JSON.parse(message);
    // await roomService.removeSpectator(ws,messageData)
  });
};

export const updateRoomData = async function (req, res, next) {
  try {
    /*
    data={
        roomId: String,
        userId:String,
        progress: Number,
        movieId:String
    }
    */
    const room = await roomService.updateRoomProgress(req.body);
    return res.json(room);
  } catch (error) {
    next(error);
  }
};
export const deleteRoom = async function (req, res, next) {
  /*
    req.body = {
        roomId: String,
    }
    */
  try {
    const room = await roomService.deleteRoom(req.body);
    return res.json(room);
  } catch (error) {
    next(error);
  }
};
export const showPublicRooms = async function (req, res, next) {
  try {
    const rooms = await roomService.showPublicRooms();
    console.log("get public in controller");
    return res.json(rooms);
  } catch (error) {
    next(error);
  }
};
export const showPrivateRooms = async function (req, res, next) {
  try {
    /*
    req = {
        ownerId: String,

    }
    */
    const rooms = await roomService.showPrivateRooms(req.body);
    return res.json(rooms);
  } catch (error) {
    next(error);
  }
};
export const removeSpectator = async function (req, res, next) {
  try {
    /*
      req.body={
          roomId: String,
          spectator: String,
      }
      */
    const room = await roomService.removeSpectator(req.body);
    return res.json(room);
  } catch (error) {
    next(error);
  }
};
export const getRoom = async function (req, res, next) {
  try {
    /*
    req.body={
        roomId: String,
    }
    */
    const room = await roomService.getRoom(req.body);
    return res.json(room);
  } catch (error) {
    next(error);
  }
};

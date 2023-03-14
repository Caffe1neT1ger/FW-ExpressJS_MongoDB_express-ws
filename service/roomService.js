import { ApiError } from "../exceptions/apiError.js";
import Room from "../models/roomModel.js";
import User from "../models/userModel.js";
import aWss from "../server.js";

/* Создение комнаты в БД и WS  ws*/
 const createRoom = async function (ws, messageData) {
  /*
    messageData = {
        ownerId: String,
        movieId: String,
        spectatorsId: [String],
        progress:Number,
        roomType: String,       public/private
        type: "create"
    }
    */
  /* Создали комнату в БД */
  const user =await  User.findById(messageData.ownerId);
  const room = await Room.create({
    ownerId: user._id,
    movieId: messageData.movieId,
    spectatorsId: [],
    progress: 0,
    type: messageData.roomType,
  });

  messageData.progress = 0;
  messageData.isPause = true;
  messageData.isOwner = true;
  /*Настройка ws */
  ws.roomId = room._id.toString();
  messageData.roomId =  room._id.toString();
  ws.userId = messageData.ownerId.toString();
  ws.isOwner = true;
  ws.isPause = true;
  ws.progress = 0;
  ws.movieId = messageData.movieId;
  ws.roomType = messageData.roomType;

  messageData.message = `Пользователь ${messageData.userId} создал комнату ${messageData.roomId}`;
  getUserList(ws, messageData);

};

/*  Удаление комнаты из БД  http*/
 const deleteRoom = async function (data) {
  /*
    data = {
        roomId: String,
    }
    */
  const room = await Room.deleteOne({ _id: data.roomId });
  return room;
};

/* Показывает все открытые комнаты http*/
 const showPublicRooms = async function () {
  const rooms = await Room.find({ type: "public" });
  console.log("get public in service")
  return rooms;
};

/* Показывает закрытые комнаты пользовтеля http*/
 const showPrivateRooms = async function (data) {
  /*
    data = {
        ownerId: String,

    }
    */

  const rooms = await Room.find({ ownerId: data.ownerId });
  return rooms;
};

/* Сохранение прогрессы в БД http*/
 const updateRoomProgress = async function (data) {
  /*
    data={
        roomId: String,
        userId:String,
        progress: Number,
        movieId:String
    }
    */

  const room = await Room.findById(data.roomId);
  if (data.userId != room.ownerId) {
    data.message("Пользователь не является адимном этой комнаты");
    return data;
  }
  room.progress = data.progress;
  room.movieId = data.movieId;
  return await room.save();
};

/* Удаляет зрителя из комнаты http*/
 const removeSpectator = async function (data) {
  /*
      message={
          roomId: String,
          spectator: String,

      }
      */

  const room = await Room.findById(data.roomId);
  const spectators = room.spectatorsId;
  room.progress = spectators.filter((item) => item.str != data.spectator);
  return await room.save();
};

/* Получаем комнату по его id http*/
 const getRoom = async function (data) {
  /*
    message={
        roomId: String,

    }
    */
  const room = await Room.findById(data.roomId);
  return room;
};

/* Соединяет пользовтеля с комнатой ws*/
 const connection = async function (ws, messageData) {
  /*
  const data = {
    userId: String,
    roomId: String,
  };
  */

  const room = await Room.findById(messageData.roomId);
  room.spectatorsId.push(messageData.userId);
  await room.save();

  messageData.isOwner = false;
  messageData.isPause = true;
  messageData.progress = 0;
  // ws.user = JSON.parse(JSON.stringify(data));
  ws.userId = messageData.userId.toString();
  ws.roomId = messageData.roomId.toString();
  ws.isOwner = messageData.isOwner;
  ws.isPause = true;
  ws.progress = 0;

  messageData.message = `Пользователь ${messageData.userId} подключился к комнате`;
  getUserList(ws, messageData);
};

/* ws*/
 const getUserList = async function (ws, messageData) {
  let arr = [];
  aWss.clients.forEach((client) => {
    if (client.roomId === messageData.roomId) {
      arr.push({
        userId: client.userId,
      });
    }
  });

  messageData.userList = JSON.parse(JSON.stringify(arr));
  broadcastConnection(ws, messageData);
};

/* Пересылает ws сообщение всем пользователям в комнате ws*/
 const broadcastConnection = function (ws, messageData) {
  // const user = {
  //   userId: "001",
  //   username: "Croak",
  //   owner:true/false
  //   roomId: roomId,
  //   isPause: true,
  //   progress: 0,
  // };

  // const roomOperating = {
  //   roomId: roomId,
  //   ownerId:'001',
  //   method: "watch",
  //   progress: progress,
  //   isPause: true/false,
  //   operation: isPauseClient ? "start" : "stop",
  //   movieId:"movieId",
  // };
  aWss.clients.forEach((client) => {
    // console.log(messageData)
    // console.log( client.roomId,messageData.roomId)
    if (client.roomId === messageData.roomId) {
       
      if (messageData.method == "connection") {
        if (client.owner) {
            
          messageData.movieId = client.movieId;
        }
      }

      client.send(
        JSON.stringify({
          ...messageData,
        })
      );
    }
  });
};

export default {
  createRoom,
  deleteRoom,
  showPublicRooms,
  showPrivateRooms,
  updateRoomProgress,
  removeSpectator,
  getRoom,
  connection,
  getUserList,
  broadcastConnection,
};

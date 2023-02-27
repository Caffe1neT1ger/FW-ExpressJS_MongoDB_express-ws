import { ApiError } from "../exceptions/apiError.js";
import Room from "../models/roomModel.js";
import aWss from "../server.js";
/* Создение комнаты в БД и WS */
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
  const room = await Room.create({
    ownerId: messageData.ownerId,
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
/*  Удаление комнаты из БД */
 const deleteRoom = async function (ws, messageData) {
  /*
    message = {
        id: String,
        type: "delete"
    }
    */
  const room = await Room.deleteOne({ _id: messageData.roomId });
  return room;
};
/* Показывает все открытые комнаты */
 const showPublicRooms = async function (ws, messageData) {
  const rooms = await Room.find({ type: "public" });
  return rooms;
};
/* Показывает закрытые комнаты пользовтеля*/
 const showPrivateRooms = async function (ws, messageData) {
  /*
    message = {
        ownerId: String,
        type: "showPrivate"
    }
    */

  const rooms = await Room.find({ ownerId: messageData.ownerId });
  return rooms;
};
/* Сохранение прогрессы в БД */
 const updateRoomProgress = async function (ws, messageData) {
  /*
    message={
        roomId: String,
        userId:String,
        progress: Number,
        type: "update"
    }
    */

  const room = await Room.findById(messageData.roomId);
  if (userId != room.ownerId) {
    messageData.message("Пользователь не является адимном этой комнаты");
    return messageData;
  }
  room.progress = messageData.progress;
  return await room.save();
};
/* Удаляет зрителя из комнаты */
 const removeSpectator = async function (ws, messageData) {
  /*
      message={
          roomId: String,
          spectator: Number,
          type: "removeSpectator"
      }
      */

  const room = await Room.findById(messageData.roomId);
  const spectators = room.spectatorsId;
  room.progress = spectators.filter((item) => item != messageData.spectator);
  return await room.save();
};
/* Получаем комнату по его id */
 const getRoom = async function (ws, messageData) {
  /*
    message={
        roomId: String,
        type: "getOne"
    }
    */
  const room = await Room.findById(messageData.roomId);
  return room;
};
/* Соединяет пользовтеля с комнатой */
 const connection = async function (ws, messageData) {
  /*
  const data = {
    userId: String,
    roomId: String,
  };
  */

  const room = await Room.findById(messageData.roomId);
  room.spectatorsId = room.spectatorsId.push(messageData.userId);
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
/* */
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
/* Пересылает ws сообщение всем пользователям в комнате */
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
    console.log(messageData)
    console.log( client.roomId,messageData.roomId)
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

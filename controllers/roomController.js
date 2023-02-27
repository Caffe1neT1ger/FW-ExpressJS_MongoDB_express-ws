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
        // case: "close":

    }
  });
  ws.on("close", async function(ws,message){
    // const messageData = JSON.parse(message);
    // await roomService.removeSpectator(ws,messageData)
  });
};

import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const roomSchema = mongoose.Schema(
  {
    ownerId: {
      type: String,
      // type: ObjectId,
      // ref: "User",
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    spectatorsId: [
      {
        type:String
        // type: ObjectId,
        // ref: "User",
      },
    ],
    progress: {
      type: Number,
      required: true,
      default: 0,
    },
    type:{
      type:String,
      required:true,
    }
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;

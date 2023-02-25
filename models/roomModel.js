import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const roomSchema = mongoose.Schema(
  {
    ownerId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    spectatorsId: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;

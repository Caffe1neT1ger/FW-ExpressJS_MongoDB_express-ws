import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { ObjectId } = mongoose.Schema;
const tokenSchema = mongoose.Schema(
  {
    refreshToken:{
        type:String,
        required:true,
    },
    user:{
        type:ObjectId,
        ref:'User',
        required:true,
    }
  },
  {
    minimize: false,
    timestamps: false,
  }
);


const Token = mongoose.model("Token", tokenSchema);
export default Token;

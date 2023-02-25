import jwt from "jsonwebtoken";
import Token from "../models/token-model.js";

const generateToken = async function (payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async function (userId, refreshToken) {
  const tokenData = await Token.findOne({ user: userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return await tokenData.save();
  }
  const token = await Token.create({
    user: userId,
    refreshToken: refreshToken,
  });
  return token;
};
const removeToken = async function (refreshToken) {
  const tokenData = await Token.deleteOne({ refreshToken });
  return tokenData
};
const validateAccessToken= function(token){
  try{
      const userData = jwt.verify(token,process.env.JWT_ACCESS_SECRET)
      return userData
  }catch(error){
      return null
  }
}
const validateRefreshToken= function(token){
  try{
      const userData = jwt.verify(token,process.env.JWT_REFRESH_SECRET)
      return userData
  }catch(error){
      return null
  }
}
const findToken = async function (refreshToken) {
  const tokenData = await Token.finOne({ refreshToken });
  return tokenData
};
export default {
  generateToken,
  saveToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findToken
};

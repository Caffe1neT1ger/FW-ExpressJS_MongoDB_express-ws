import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4, validate } from "uuid";
import mailService from "./mailService.js";
import tokenService from "./tokenService.js";
import UserDto from "../dtos/userDto.js";
import { ApiError } from "../exceptions/apiError.js";
import Token from "../models/token-model.js";
import jwt  from "jsonwebtoken";

const registration = async function (email, password) {
  const candidate = await User.findOne({ email });
  if (candidate) {
    throw ApiError.BarRequest(`Пользователь с почтовым адресом ${email} уже существует`);
  }
  const hashPassword = await bcrypt.hash(password, 3);
  const activationLink = uuidv4();
  const user = await User.create({
    email,
    password: hashPassword,
    activationLink,
  });
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/`+activationLink);

  const userDto = new UserDto(user);
  const tokens = await tokenService.generateToken({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
...tokens,
    user: userDto,
  };
};

const activate = async function(activationLink){
    const user = await User.findOne({activationLink:activationLink});
    if (!user) {
        // return {
        //     message:`Пользователя не существует`
        // }
        throw  ApiError.BarRequest(`Неккоректная ссылка активации`);
    }
    user.isActivated=true;
    await user.save();

}
const login = async function(email,password){
    const user = await User.findOne({email:email});
    if (!user) {
        throw ApiError.BarRequest(`Пользователь не найден`);
    }
    const isPassEquals = await   bcrypt.compare(password, user.password);
    if (!isPassEquals){
        throw ApiError.BarRequest(`Неккоректный пароль`);
    }

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
  
    return {
  ...tokens,
      user: userDto,
    };

}
const logout = async function(refreshToken){
    const token = await tokenService.removeToken(refreshToken);
    return token;
}
const refresh = async function(refreshToken){
    if (!refreshToken){
        throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb){
        throw ApiError.UnauthorizedError()
    }
    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
  
    return {
  ...tokens,
      user: userDto,
    };
    
}
const getAllUsers = async function(){
    const users = await User.find()
    return users
}

export default {
  registration,
  activate,
  login,
  logout,
  refresh,
  getAllUsers,
};

import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import HttpException from "../exceptions/http.exception";
import { RequestWithUser } from "../utils/requestWithUser";
import { jwtPayload } from "../utils/jwtPayload.type";

const authenticate = async (
  req:  RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFromRequestHeader(req);
    const payload :jwtPayload = Jwt.verify(token, process.env.JWT_SECRET) as jwtPayload
    
    req.name =payload.name;
    req.email=payload.email;
    req.role=payload.role;
    next();
  } catch (err) {
    next(new HttpException(401,err.message))
  }
};

const getTokenFromRequestHeader =  (req: Request) => {

  const bearerToken = req.header("Authorization");
  const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
  return token;
};

export default authenticate;

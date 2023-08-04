import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";
import HttpException from "../exceptions/http.exception";

const authorize = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = req.role;
    if (role != Role.HR) {
      throw new HttpException(403, "you do not have permission");
    }
    next();
  } catch (err) {
    next(err)
  }
};

export default authorize;

import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../utils/requestWithUser";

import HttpException from "../exceptions/http.exception";
import { Role } from "../utils/role.enum";

const authorize = function (roles: Role[]) {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const role = req.role;
      console.log(role);
      if (roles.indexOf(role) == -1) {
        throw new HttpException(403, "you do not have permission");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default authorize;

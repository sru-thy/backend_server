import { NextFunction, Request, Response } from "express";
import logger from "../utils/winstonLogger";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${new Date()} : ${req.url} : ${req.method}`);
  req.body.time = new Date().getTime()
  next();
};

export default loggerMiddleware;

import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import ValidationException from "../exceptions/validation.exception";
import logger from "../utils/winstonLogger";

const errorMidlleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (error instanceof HttpException) {
      res.status(error.status).send({ message: "Http Errors", errors: error.message });
      logger.error(`${error.status} : ${error.message}`)
    } else if (error instanceof ValidationException) {
      logger.error(`${error.status} : ${error.message}`)
      res
        .status(error.status)
        .send({ message: "Validation Errors", errors: error.errors });
    } else {
      res.status(500).send({ message: "Internal Server Error", errors: error.message });
      logger.error(error);
    }
  } catch (err) {
    next(err);
  }
};

export default errorMidlleware;

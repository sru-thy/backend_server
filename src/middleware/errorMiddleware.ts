import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import ValidationException from "../exceptions/validation.exception";

const errorMidlleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (error instanceof HttpException) {
      res.status(error.status).send({ message: error.message });
    } else if (error instanceof ValidationException) {
      res
        .status(error.status)
        .send({ message: "Validation Errors", errors: error.errors });
    } else {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  } catch (err) {
    next(err);
  }
};

export default errorMidlleware;

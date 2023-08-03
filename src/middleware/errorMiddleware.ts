import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";

const errorMidlleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (error instanceof HttpException) {
      res.status(error.status).send({ error: error.message });
    } else {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  } catch (err) {
    next(err);
  }
};

export default errorMidlleware;

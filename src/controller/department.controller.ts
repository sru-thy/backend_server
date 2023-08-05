import express, { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { DepartmentService } from "../service/department.service";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import ValidationException from "../exceptions/validation.exception";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export class DepartmentController {
  public router: Router;

  constructor(private departmentService: DepartmentService) {
    this.router = express.Router();
    this.router.post("/", this.createDepartment);
  }

  createDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name } = req.body;

      const createDepartmentDto = plainToInstance(
        CreateDepartmentDto,
        req.body
      );
      const errors = await validate(createDepartmentDto);

      if (errors.length > 0) {
        throw new ValidationException(400, errors);
      }
      const employee = await this.departmentService.createDepartment(
        createDepartmentDto.name
      );
      res.status(201).send(employee);
    } catch (err) {
      next(err);
    }
  };
}

import express, { NextFunction } from "express";
import { EmployeeService } from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/createEmployee.dto";
import { validate } from "class-validator";
import ValidationException from "../exceptions/validation.exception";
import UpdateEmployeeDto from "../dto/updateEmployee.dto";

import authenticate from "../middleware/authenticateMiddleware";

export class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();
    this.router.get("/", authenticate  ,this.getAllEmployees);
    this.router.get("/:id", authenticate,this.getEmployeeByID);
    this.router.post("/", authenticate,this.createEmployee);
    this.router.put("/:id", authenticate,this.updateEmployee);
    this.router.delete("/:id",authenticate,this.deleteEmployee);
    this.router.post("/login", this.loginEmployee);
  }

  getAllEmployees = async (req: express.Request, res: express.Response) => {
    const employee = await this.employeeService.getAllEmployees();
    res.status(200).send(employee);
  };

  getEmployeeByID = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const employee = await this.employeeService.getEmployeeByID(
        Number(req.params.id)
      );
      res.status(200).send(employee);
    } catch (error) {
      next(error);
    }
  };

  createEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, address, password } = req.body;
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);

      if (errors.length > 0) {
        throw new ValidationException(400, errors);
      }

      const employee = await this.employeeService.createEmployee(
        createEmployeeDto.name,
        createEmployeeDto.email,
        createEmployeeDto.password,
        createEmployeeDto.address
      );
      res.status(201).send(employee);
    } catch (err) {
      next(err);
    }
  };

  updateEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, address } = req.body;
      const id = Number(req.params.id);

      const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
      const errors = await validate(updateEmployeeDto);

      if (errors.length > 0) {
        throw new ValidationException(400, errors);
      }
      const employee = await this.employeeService.updateEmployee(
        id,
        name,
        email,
        address
      );
      res.status(201).send(employee);
    } catch (err) {
      next(err);
    }
  };

  deleteEmployee = async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    const employee = await this.employeeService.deleteEmployee(id);
    res.status(204).send(employee);
  };

  public loginEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const token = await this.employeeService.loginEmployee(email,password)
      res.status(200).send({data:token})
    } catch (err) {
      next(err);
    }
  };
}

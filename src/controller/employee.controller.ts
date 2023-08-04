import express, { NextFunction } from "express";
import { EmployeeService } from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/createEmployee.dto";
import { validate } from "class-validator";
import HttpException from "../exceptions/http.exception";
import ValidationException from "../exceptions/validation.exception";
import UpdateEmployeeDto from "../dto/updateEmployee.dto";

export class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();
    this.router.get("/", this.getAllEmployees);
    this.router.get("/:id", this.getEmployeeByID);
    this.router.post("/", this.createEmployee);
    this.router.put("/:id", this.updateEmployee);
    this.router.delete("/:id", this.deleteEmployee);
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
      const { name, email, address,password } = req.body;
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);

      if (errors.length > 0) {
        console.log(errors);
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
        console.log(errors);
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
}

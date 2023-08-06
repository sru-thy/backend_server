import express, { NextFunction } from "express";
import { EmployeeService } from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate } from "class-validator";
import ValidationException from "../exceptions/validation.exception";
import UpdateEmployeeDto from "../dto/update-employee.dto";

import authenticate from "../middleware/authenticateMiddleware";
import authorize from "../middleware/authorizeMiddleware";
import { Role, userRoles } from "../utils/role.enum";
import jsonResponse from "../utils/response";

export class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();
    this.router.get(
      "/",
      authenticate,
      authorize(userRoles.admin),
      this.getAllEmployees
    );
    this.router.get(
      "/:id",
      authenticate,
      authorize(userRoles.admin),
      this.getEmployeeByID
    );
    this.router.post("/", this.createEmployee);
    this.router.patch(
      "/:id",
      authenticate,
      authorize(userRoles.admin),
      this.updateEmployee
    );
    this.router.delete(
      "/:id",
      authenticate,
      authorize(userRoles.admin),
      this.deleteEmployee
    );
    this.router.post("/login", this.loginEmployee);
  }

  getAllEmployees = async (req: express.Request, res: express.Response) => {
    const employee = await this.employeeService.getAllEmployees();
    res.status(200).send(
      new jsonResponse(employee, "OK", null, {
        length: employee.length,
        took: new Date().getTime(),
        total: employee.length,
      })
    );
  };

  getEmployeeByID = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const employee = await this.employeeService.getEmployeeByID(
        req.params.id
      );
      res.status(200).send(
        new jsonResponse(employee, "OK", null, {
          length: 1,
          took: new Date().getTime(),
          total: 1,
        })
      );
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
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);

      if (errors.length > 0) {
        throw new ValidationException(400, errors);
      }

      const employee = await this.employeeService.createEmployee(
        createEmployeeDto.name,
        createEmployeeDto.username,
        createEmployeeDto.password,
        createEmployeeDto.role,
        createEmployeeDto.address,
        createEmployeeDto.experience,
        createEmployeeDto.joiningDate,
        createEmployeeDto.departmentId
      );
      res.status(201).send(
        new jsonResponse(employee, "OK", null, {
          length: 1,
          took: new Date().getTime(),
          total: 1,
        })
      );
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
      const id = req.params.id;
      await this.employeeService.getEmployeeByID(req.params.id);

      const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
      const errors = await validate(updateEmployeeDto);

      if (errors.length > 0) {
        throw new ValidationException(400, errors);
      }
      const employee = await this.employeeService.updateEmployee(
        id,
        updateEmployeeDto
      );
      res.status(201).send(
        new jsonResponse(employee, "OK", null, {
          length: 1,
          took: new Date().getTime(),
          total: 1,
        })
      );
    } catch (err) {
      next(err);
    }
  };

  deleteEmployee = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const employee = await this.employeeService.deleteEmployee(id);
    res.status(204).send(employee);
  };

  public loginEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const { username, password } = req.body;
      const data = await this.employeeService.loginEmployee(username, password);
      res.status(200).send(
        new jsonResponse(data, "OK", null, {
          length: 1,
          took: new Date().getTime(),
          total: 1,
        })
      );
    } catch (err) {
      next(err);
    }
  };
}

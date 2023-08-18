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
import logger from "../utils/winstonLogger";

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
    this.router.post(
      "/",
      authenticate,
      authorize(userRoles.admin),
      this.createEmployee
    );
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
    const skip = Number(req.query.skip) || 0;
    const take = Number(req.query.take) || 10;
    const employee = await this.employeeService.getAllEmployees(skip, take);
    logger.info(`get all employees`)
    res.status(200).send(
      new jsonResponse(employee, "OK", null, {
        length: employee[0].length,
        took: new Date().getTime() - req.body.time,
        total: employee[1],
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
        Number(req.params.id)
      );
      logger.info(`get employes by ID`)
      res.status(200).send(
        new jsonResponse(employee, "OK", null, {
          length: 1,
          took: new Date().getTime() - req.body.time,
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
      logger.info(`Employee created`)
      res.status(201).send(
        new jsonResponse(employee, "OK", null, {
          length: 1,
          took: new Date().getTime() - req.body.time,
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
      const id = Number(req.params.id);

      await this.employeeService.getEmployeeByID(id);

      const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
      const errors = await validate(updateEmployeeDto);

      if (errors.length > 0) {
        throw new ValidationException(400, errors);
      }
      const employee = await this.employeeService.updateEmployee(
        id,
        updateEmployeeDto
      );
      logger.info(`Employee updated`)
      res.status(201).send(
        new jsonResponse(employee, "OK", null, {
          length: 1,
          took: new Date().getTime() - req.body.time,
          total: 1,
        })
      );
    } catch (err) {
      next(err);
    }
  };

  deleteEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const employee = await this.employeeService.deleteEmployee(Number(id));
      logger.info(`Empoyee deleted`)
      res.status(204).send(employee);
    } catch (err) {
      next(err);
    }
  };

  public loginEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const { username, password } = req.body;
      const data = await this.employeeService.loginEmployee(username, password);
      logger.info(`Employee : ${username} Logged in`)
      res.status(200).send(
        new jsonResponse(data, "OK", null, {
          length: 1,
          took: new Date().getTime() - req.body.time,
          total: 1,
        })
      );
    } catch (err) {
      next(err);
    }
  };
}

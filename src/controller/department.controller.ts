import express, { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { DepartmentService } from "../service/department.service";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import ValidationException from "../exceptions/validation.exception";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import UpdateDepartmentDto from "../dto/update-department.dto";
import authenticate from "../middleware/authenticateMiddleware";
import authorize from "../middleware/authorizeMiddleware";
import { userRoles } from "../utils/role.enum";
import jsonResponse from "../utils/response";
import logger from "../utils/winstonLogger";

export class DepartmentController {
  public router: Router;

  constructor(private departmentService: DepartmentService) {
    this.router = express.Router();
    this.router.post(
      "/",
      authenticate,
      authorize(userRoles.admin),
      this.createDepartment
    );
    this.router.put(
      "/:id",
      authenticate,
      authorize(userRoles.admin),
      this.updateDepartment
    );
    this.router.delete(
      "/:id",
      authenticate,
      authorize(userRoles.admin),
      this.deleteDepartment
    );
    this.router.get(
      "/",
      authenticate,
      authorize(userRoles.admin),
      this.getAllDepartments
    );
    this.router.get(
      "/:id",
      authenticate,
      authorize(userRoles.admin),
      this.getDepartmentByID
    );
  }

  createDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const createDepartmentDto = plainToInstance(
        CreateDepartmentDto,
        req.body
      );
      const errors = await validate(createDepartmentDto);

      if (errors.length > 0) {
        throw new ValidationException(400, errors);
      }
      const department = await this.departmentService.createDepartment(
        createDepartmentDto.name
      );
      logger.info('department created')
      res.status(201).send(
        new jsonResponse(department, "OK", null, {
          length: 1,
          took: new Date().getTime() - req.body.time,
          total: 1,
        })
      );
    } catch (err) {
      next(err);
    }
  };

  getAllDepartments = async (req: express.Request, res: express.Response) => {
    const department = await this.departmentService.getAllDepartments();
    logger.info('get all departments')
    res.status(200).send(
      new jsonResponse(department, "OK", null, {
        length: department.length,
        took: new Date().getTime() - req.body.time,
        total: department.length,
      })
    );
  };

  getDepartmentByID = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const department = await this.departmentService.getDepartmentByID(
        Number(req.params.id)
      );
      logger.info('get department by id')
      res.status(200).send(
        new jsonResponse(department, "OK", null, {
          length: department.length,
          took: new Date().getTime() - req.body.time,
          total: department.length,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  updateDepartment = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const { name } = req.body;
      const id = Number(req.params.id);
      await this.departmentService.getDepartmentByID(id);
    
      const updateDepartmentDto = plainToInstance(
        UpdateDepartmentDto,
        req.body
      );
      const errors = await validate(updateDepartmentDto);

      if (errors.length > 0) {
        throw new ValidationException(400, errors);
      }
      const department = await this.departmentService.updateDepartment(
        name,
        id
      );
      logger.info('update department')
      res.status(201).send(
        new jsonResponse(department, "OK", null, {
          length: 1,
          took: new Date().getTime() - req.body.time,
          total: 1,
        })
      );
    } catch (err) {
      next(err);
    }
  };

  deleteDepartment = async (req: express.Request, res: express.Response,next: NextFunction) => {
    try{
    const id = Number(req.params.id);
    await this.departmentService.getDepartmentByID(id);
    const department = await this.departmentService.deleteDepartment(id);
    logger.info('deleted department')
    res.status(201).send(department);
    }catch(err){
      next(err)
    }
  };
}

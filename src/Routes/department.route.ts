import { DepartmentController } from "../controller/department.controller";
import AppDataSource from "../db/postgres.db";
import Department from "../entity/department.entity";
import { DepartmentRepository } from "../repository/department.repository";
import { DepartmentService } from "../service/department.service";

const depRepository = new DepartmentRepository(
  AppDataSource.getRepository(Department)
);

const depService = new DepartmentService(depRepository);

const depController = new DepartmentController(depService);

const departmentRoute = depController.router;

export default departmentRoute;

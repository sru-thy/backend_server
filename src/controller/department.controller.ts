import express from "express";
import { Router } from "express";
import { DepartmentService } from "../service/department.service";

export class DepartmentController {
  public router: Router;

  constructor(private departmentService: DepartmentService) {
    this.router = express.Router();
  }
}

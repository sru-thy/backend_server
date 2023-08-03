import express from "express";
import { EmployeeService } from "../service/employee.service";

export class EmployeeController {
  public router: express.Router;

  constructor( private employeeService: EmployeeService) {
    this.router = express.Router();
    this.router.get("/",this.getAllEmployees)
    this.router.get("/:id",this.getEmployeeByID)
  }

  getAllEmployees = async (req : express.Request, res: express.Response) => {
    const employee = await this.employeeService.getAllEmployees();
    res.status(200).send(employee);
  }

  getEmployeeByID = async (req : express.Request, res: express.Response) => {
    const employee = await this.employeeService.getEmployeeByID( Number(req.params.id) );
    res.status(200).send(employee);
  }


}

import express from "express";
import { EmployeeService } from "../service/employee.service";

export class EmployeeController {
  public router: express.Router;

  constructor( private employeeService: EmployeeService) {
    this.router = express.Router();
    this.router.get("/",this.getAllEmployees)
    this.router.get("/:id",this.getEmployeeByID)
    this.router.post("/",this.createEmployee)
    this.router.put("/:id",this.updateEmployee)
    this.router.delete("/:id",this.deleteEmployee)
  }

  getAllEmployees = async (req : express.Request, res: express.Response) => {
    const employee = await this.employeeService.getAllEmployees();
    res.status(200).send(employee);
  }

  getEmployeeByID = async (req : express.Request, res: express.Response) => {
    const employee = await this.employeeService.getEmployeeByID( Number(req.params.id) );
    res.status(200).send(employee);
  }

  createEmployee =  async (req : express.Request, res: express.Response) => {
    const name = req.body.name;
    const email = req.body.email;
    const employee = await this.employeeService.createEmployee(name,email)
    res.status(201).send(employee);
  }

  updateEmployee =  async (req : express.Request, res: express.Response) => {
    const name = req.body.name;
    const email = req.body.email;
    const id = Number (req.params.id);
    const employee = await this.employeeService.updateEmployee(id,name,email)
    res.status(201).send(employee);
  }

  deleteEmployee =  async (req : express.Request, res: express.Response) => {
    const id = Number (req.params.id);
    const employee = await this.employeeService.deleteEmployee(id)
    res.status(204).send(employee);
  }

}

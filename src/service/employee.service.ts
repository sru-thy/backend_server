import { Address } from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exception";
import { EmployeeRepository } from "../repository/employee.repository";
import bcrypt from "bcrypt";

import Jwt from "jsonwebtoken";
import { Role } from "../utils/role.enum";
import { jwtPayload } from "../utils/jwtPayload.type";
import UpdateEmployeeDto from "../dto/update-employee.dto";
import Department from "../entity/department.entity";

export class EmployeeService {
  constructor(private empRepository: EmployeeRepository) {}

  getAllEmployees(): Promise<Employee[]> {
    return this.empRepository.find();
  }

  async getEmployeeByID(id: number): Promise<any> {
    const employee = await this.empRepository.findOneBy({ id: id });
    console.log(employee);
    if (!employee) {
      throw new HttpException(404, "employee not found");
    }
    return employee;
  }
  async createEmployee(
    name: string,
    username: string,
    password: string,
    role: Role,
    address: any,
    experience:number,
    joiningDate:string,
    department : string
  ): Promise<Employee> {
    const newEmployee = new Employee();
    newEmployee.username = username;
    newEmployee.name = name;
    newEmployee.password = await bcrypt.hash(password, 10);
    newEmployee.role = role;
    newEmployee.experience= experience;
    newEmployee.joiningDate=joiningDate
    newEmployee.department = <any>Number(department) // typesafe?

    const newAddress = new Address();
    newAddress.line1 = address.line1;
    newAddress.line2 = address.line2;
    newAddress.state = address.state;
    newAddress.country = address.country;
    newAddress.pincode = address.pincode;
    newEmployee.address = newAddress;

    return this.empRepository.createEmployee(newEmployee);
  }

  async updateEmployee(
    id: number,
updateEmployeeDto:UpdateEmployeeDto
  ): Promise<Employee> {
    // const employeetoupdate = await this.empRepository.findOneBy({ id: id });
    // employeetoupdate.username = username;
    // employeetoupdate.name = name;
    // employeetoupdate.address.line1 = address.line1;
    // employeetoupdate.address.line2 = address.line2;
    // employeetoupdate.address.pincode = address.pincode;
  
    const updated = await this.empRepository.updateEmployee(id,updateEmployeeDto);
    return await this.empRepository.findOneBy({ id: id });

  }

  deleteEmployee(id: number): Promise<Employee> {
    return this.empRepository.deleteEmployee(id);
  }

  loginEmployee = async (username: string, password: string) => {
    const employee = await this.empRepository.findOneBy({ username: username });
    if (!employee) {
      throw new HttpException(401, "Incorrect username or Password");
    }

    const result = await bcrypt.compare(password, employee.password);
    if (!result) {
      throw new HttpException(401, "Incorrect username or Password");
    }

    const payload : jwtPayload = {
      name: employee.name,
      username: employee.username,
      role: employee.role,
    };

    const token = Jwt.sign(payload,process.env.JWT_SECRET, {
      expiresIn: "24h"
    })
    
    return {token:token}

  };
}

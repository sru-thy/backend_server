import { Address } from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exception";
import { EmployeeRepository } from "../repository/employee.repository";
import bcrypt from 'bcrypt';

export class EmployeeService {
  constructor(private empRepository: EmployeeRepository) {}

  getAllEmployees(): Promise<Employee[]> {
    return this.empRepository.find();
  }

  async getEmployeeByID(id: number): Promise<any> {
    const employee = await this.empRepository.findOneBy({id:id});
    console.log(employee)
    if (!employee) {
      throw new HttpException(404, "employee not found");
    }
    return employee;
  }
  async createEmployee(name: string, email: string, password:string, address: any): Promise<Employee> {
    const newEmployee = new Employee();
    newEmployee.email = email;
    newEmployee.name = name;
    newEmployee.password = await bcrypt.hash(password,10);

    const newAddress = new Address();
    newAddress.line1 = address.line1;
    newAddress.line2 = address.line2;
    newAddress.pincode = address.pincode;

    newEmployee.address = newAddress;

    return this.empRepository.createEmployee(newEmployee);
  }

  async updateEmployee(
    id: number,
    name: string,
    email: string,
    address: any
  ): Promise<Employee> {
    const employeetoupdate = await this.empRepository.findOneBy({id : id});
    employeetoupdate.email = email;
    employeetoupdate.name = name;
    employeetoupdate.address.line1 = address.line1;
    employeetoupdate.address.line2 = address.line2;
    employeetoupdate.address.pincode = address.pincode;
    return this.empRepository.updateEmployee(employeetoupdate);
  }

  deleteEmployee(id: number): Promise<Employee> {
    return this.empRepository.deleteEmployee(id);
  }



  loginEmployee = async (email:string,password:string) => {
    const employee = await this.empRepository.findOneBy({email: email})
    if(!employee){
      throw new HttpException(401,'Incorrect username or Password')
    }

    const result = await bcrypt.compare(password,employee.password)
    if(!result){
      throw new HttpException(401,'Incorrect username or Password')
    }

  }
}

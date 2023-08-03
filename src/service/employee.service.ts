import Employee from "../entity/employee.entity";
import { EmployeeRepository } from "../repository/employee.repository";

export class EmployeeService {
  constructor(private empRepository: EmployeeRepository) {}

  getAllEmployees(): Promise<Employee[]> {
    return this.empRepository.find();
  }

  getEmployeeByID(id: number): Promise<Employee | null> {
    return this.empRepository.findOneBy(id);
  }
  createEmployee(name: string, email:string): Promise<Employee>{
    return this.empRepository.createEmployee(name,email)
  }

  updateEmployee(id:number,name: string, email:string): Promise<Employee>{
    return this.empRepository.updateEmployee(id,name,email)
  }

  deleteEmployee(id:number): Promise<Employee>{
    return this.empRepository.deleteEmployee(id)
  }

}

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
}

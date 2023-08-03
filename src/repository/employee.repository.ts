import { DataSource, Repository } from "typeorm";
import AppDataSource from "../db/postgres.db";
import Employee from "../entity/employee.entity";

export class EmployeeRepository {
  constructor(private empRepository: Repository<Employee>) {}

  find(): Promise<Employee[]> {
    return this.empRepository.find();
  }

  findOneBy(id: number): Promise<Employee> {
    return this.empRepository.findOneBy({ id: id });
  }

  createEmployee(name: string, email: string): Promise<Employee> {
    const newEmployee = new Employee();
    newEmployee.email = email;
    newEmployee.name = name;
    return this.empRepository.save(newEmployee);
  }

  async updateEmployee(
    id: number,
    name: string,
    email: string
  ): Promise<Employee> {
    const employeetoupdate = await this.findOneBy(id);

    employeetoupdate.email = email;
    employeetoupdate.name = name;
    return this.empRepository.save(employeetoupdate);
  }

  async deleteEmployee(id: number): Promise<Employee> {
    const employeetodelete = await this.findOneBy(id);
    return this.empRepository.softRemove(employeetodelete);
  }

  
}

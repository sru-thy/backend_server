import { DataSource, Repository } from "typeorm";
import AppDataSource from "../db/postgres.db";
import Employee from "../entity/employee.entity";
import { Address } from "../entity/address.entity";

export class EmployeeRepository {
  constructor(private empRepository: Repository<Employee>) {}

  find(): Promise<Employee[]> {
    return this.empRepository.find({
      relations: {
        address: true,
      },
    });
  }

  async findOneBy(filter :Partial<Employee>): Promise<Employee> {
    return await this.empRepository.findOne({
      where: filter,
      relations: {
        address: true,
      },
    });
  }

  createEmployee(newEmployee: Employee): Promise<Employee> {
    return this.empRepository.save(newEmployee);
  }

  updateEmployee(updateEmployee: Employee): Promise<Employee> {
    return this.empRepository.save(updateEmployee);
  }

  async deleteEmployee(id: number): Promise<Employee> {
    const employeetodelete = await this.findOneBy({id:id});
    return this.empRepository.softRemove(employeetodelete);
  }


}

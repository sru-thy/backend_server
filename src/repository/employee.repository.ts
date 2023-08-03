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
}

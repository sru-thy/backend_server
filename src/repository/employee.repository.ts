import { DataSource, Repository } from "typeorm";
import AppDataSource from "../db/postgres.db";
import Employee from "../entity/employee.entity";

export class EmployeeRepository {
  private dataSource: DataSource;
  private empRepository: Repository<Employee>

  constructor() {
   
    this.dataSource = AppDataSource;
    this.empRepository = this.dataSource.getRepository(Employee);
  }

  find(): Promise<Employee[]> {
  
    return this.empRepository.find();
  }

  findOneBy(id: number): Promise<Employee> {
 
    return this.empRepository.findOneBy({ id: id });
  }

  
}

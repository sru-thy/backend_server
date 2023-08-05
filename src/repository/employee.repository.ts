import { DataSource, Repository, UpdateResult } from "typeorm";
import AppDataSource from "../db/postgres.db";
import Employee from "../entity/employee.entity";
import { Address } from "../entity/address.entity";
import UpdateEmployeeDto from "../dto/update-employee.dto";

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

  updateEmployee(id:number,updateEmployeeDto:UpdateEmployeeDto): Promise<UpdateResult> {
    return this.empRepository.update({id: id}, updateEmployeeDto);
  }

  async deleteEmployee(id: number): Promise<Employee> {
    const employeetodelete = await this.findOneBy({id:id});
    return this.empRepository.softRemove(employeetodelete);
  }


}

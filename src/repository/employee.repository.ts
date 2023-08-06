import { DataSource, Repository, UpdateResult } from "typeorm";
import Employee from "../entity/employee.entity";
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

  async findOneBy(filter: Partial<Employee>): Promise<Employee> {
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

  async updateEmployee(
    id: string,
    updateEmployeeDto: any
  ): Promise<Employee> {

 
    const partialUserEntity = {
      id: id,
      ...updateEmployeeDto,
    };
    const user = await this.empRepository.preload(partialUserEntity);
    return this.empRepository.save(user);
  }

  async deleteEmployee(id: string): Promise<Employee> {
    const employeetodelete = await this.findOneBy({ id: id });
    return this.empRepository.softRemove(employeetodelete);
  }
}

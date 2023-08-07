import { DataSource, Repository, UpdateResult } from "typeorm";
import Employee from "../entity/employee.entity";
import UpdateEmployeeDto from "../dto/update-employee.dto";
import { Address } from "../entity/address.entity";

export class EmployeeRepository {
  constructor(private empRepository: Repository<Employee>) {}

 async  find(skip:number =0,take:number=10): Promise<[Employee[], number]> {
      
   const result = await this.empRepository.findAndCount({
      skip: skip,
      take : take,
      relations: {
        address: true,
      },
    });
    return result
  }

  async findOneBy(filter: Partial<Employee>): Promise<Employee> {
    return await this.empRepository.findOne({
      where: filter,
      relations: {
        address: true
      },
    });
  }

  createEmployee(newEmployee: Employee): Promise<Employee> {
    return this.empRepository.save(newEmployee);
  }

  async updateEmployee(id: number, updateEmployeeDto: any): Promise<Employee> {
    const partialEmployeeEntity = {
      id: id,
      ...updateEmployeeDto,
      address: updateEmployeeDto.address
        ? {
            id: (await this.generateIDForAddress(id)).id,
            ...updateEmployeeDto.address,
          }
        : undefined,
    };

    const employee = await this.empRepository.preload(partialEmployeeEntity);

    return this.empRepository.save(employee);
  }

  async deleteEmployee(employeetodelete : Employee): Promise<Employee> {
    return this.empRepository.softRemove(employeetodelete);
  }

  async generateIDForAddress(id): Promise<Address> {
    const employee = await this.findOneBy({ id: id });
    return employee.address;
  }
}

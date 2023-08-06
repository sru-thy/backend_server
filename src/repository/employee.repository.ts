import { DataSource, Repository, UpdateResult } from "typeorm";
import Employee from "../entity/employee.entity";
import UpdateEmployeeDto from "../dto/update-employee.dto";
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

  async findOneBy(filter: Partial<Employee>): Promise<Employee> {
    return await this.empRepository.findOne({
      where: filter,
      relations: {
        address: true,
        department: true,
      },
    });
  }

  createEmployee(newEmployee: Employee): Promise<Employee> {
    return this.empRepository.save(newEmployee);
  }

  async updateEmployee(id: string, updateEmployeeDto: any): Promise<Employee> {
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

    // const user = this.empRepository.update(id,{...updateEmployeeDto});
    // return this.findOneBy({id:id})
  }

  async deleteEmployee(id: string): Promise<Employee> {
    const employeetodelete = await this.findOneBy({ id: id });
    return this.empRepository.softRemove(employeetodelete);
  }

  async generateIDForAddress(id): Promise<Address> {
    const employee = await this.findOneBy({ id: id });
    console.log(employee.address);
    return employee.address;
  }
}

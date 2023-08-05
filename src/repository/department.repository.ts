import { Repository } from "typeorm";
import Department from "../entity/department.entity";

export class DepartmentRepository {
  constructor(private depRepository: Repository<Department>) {}

  createDepartment(newDepartment: Department): Promise<Department> {
    return this.depRepository.save(newDepartment);
  }

  findAllDepartments(): Promise<Department[]> {
    return this.depRepository.find();
  }

  async findDepartment(id: number): Promise<Department> {
    return await this.depRepository.findOneBy({id: id})
  }

  updateDepartment(updateEmployee: Department): Promise<Department> {
    return this.depRepository.save(updateEmployee);
  }

  async deleteDepartment(id: number): Promise<Department> {
    const deptodelete = await this.findDepartment(id);
    return this.depRepository.softRemove(deptodelete);
  }

}

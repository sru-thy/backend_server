import { Repository } from "typeorm";
import Department from "../entity/department.entity";

export class DepartmentRepository {
  constructor(private depRepository: Repository<Department>) {}

  createDepartment(newDepartment: Department): Promise<Department> {
    return this.depRepository.save(newDepartment);
  }
}

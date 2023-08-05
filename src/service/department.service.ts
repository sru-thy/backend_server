import Department from "../entity/department.entity";
import { DepartmentRepository } from "../repository/department.repository";

export class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}

  createDepartment(name: string): Promise<Department> {
    const newDepartment = new Department();

    newDepartment.name = name;

    return this.departmentRepository.createDepartment(newDepartment);
  }
}

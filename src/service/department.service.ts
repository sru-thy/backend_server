import { DepartmentRepository } from "../repository/department.repository";

export class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}
}

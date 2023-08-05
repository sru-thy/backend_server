import { Repository } from "typeorm";
import Department from "../entity/department.entity";

export class DepartmentRepository {
  constructor(private departmentRepository: Repository<Department>) {}
}

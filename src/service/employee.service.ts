import Employee from "../entity/employee.entity";
import { EmployeeRepository } from "../repository/employee.repository";


export class EmployeeService {

private empRepository : EmployeeRepository

constructor(){
    this.empRepository = new EmployeeRepository()
}


getAllEmployees(): Promise <Employee[]> {
    return this.empRepository.find()
}

getEmployeeByID(id: number): Promise <Employee| null> {
    return this.empRepository.findOneBy(id)
}



}
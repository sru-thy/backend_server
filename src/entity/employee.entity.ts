import { Entity, Column, OneToOne, ManyToOne } from "typeorm";
import { Address } from "./address.entity";
import { AbstractEntity } from "./abstract-entity";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";

@Entity("employees")
class Employee extends AbstractEntity {
  @Column()
  name: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  joiningDate: string;
  @Column()
  experience: number;
  @Column({ default: Role.USER })
  role: Role;
  @OneToOne(() => Address, (address) => address.employee, { cascade: true })
  address: Address;
  @ManyToOne(() => Department, { cascade: true })
  department: Department;
}

export default Employee;

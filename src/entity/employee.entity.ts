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
  email: string;
  @Column({ nullable: true })
  age: number;
  @OneToOne(() => Address, (address) => address.employee, { cascade: true })
  address: Address;
  @ManyToOne(()=>Department)
  department : Department

  @Column()
  password: string;

  @Column({default:Role.DEVELOPER })
  role:Role
}

export default Employee;

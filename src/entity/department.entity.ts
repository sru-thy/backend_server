import { Entity, Column, OneToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import Employee from "./employee.entity";

@Entity("departments")
class Department extends AbstractEntity {
  @Column()
  name: string;
}

export default Department;

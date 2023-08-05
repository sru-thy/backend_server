import { Entity, Column, OneToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import Employee from "./employee.entity";

@Entity("departments")
class Department extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}

export default Department;

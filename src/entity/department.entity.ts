import { Entity, Column, OneToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import Employee from "./employee.entity";

@Entity("departments")
class Department{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @OneToMany(()=>Employee,(employee)=>employee.department,{cascade:true})
  employees:Employee[];
}

export default Department;

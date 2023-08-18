import { Entity, Column, OneToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import Employee from "./employee.entity";

@Entity("departments")
class Department extends AbstractEntity{ 
  @Column()
  name: string;
  
  @OneToMany(()=>Employee,(employee)=>employee.department,{cascade:true})
  employees:Employee[];

}

export default Department;

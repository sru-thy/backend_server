import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Address } from "./address.entity";

@Entity("employees")
class Employee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @Column({ nullable: true })
  age: number;
  @OneToOne(() => Address, (address) => address.employee, { cascade: true })
  address: Address;
}

export default Employee;

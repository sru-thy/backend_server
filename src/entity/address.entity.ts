import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Employee from "./employee.entity";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  line1: string;
  @Column()
  line2: string;
  @Column()
  pincode: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Employee, (employee) => employee.address)
  @JoinColumn()
  employee: Employee;
}

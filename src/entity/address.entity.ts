import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from "typeorm";
import Employee from "./employee.entity";
import { AbstractEntity } from "./abstract-entity";

@Entity()
export class Address extends AbstractEntity {
  @Column()
  line1: string;
  @Column()
  line2: string;
  @Column()
  state: string;
  @Column()
  country: string;
  @Column()
  pincode: string;
  @OneToOne(() => Employee, (employee) => employee.address)
  @JoinColumn()
  employee: Employee;
}

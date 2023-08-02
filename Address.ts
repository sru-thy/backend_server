import { Entity, ManyToOne } from "typeorm";
import Employee from "./Employee";

@Entity()
export class Address {

    id : Number;
    line1: string;
    line2: string;
    pincode:string;
    @ManyToOne(() => Employee, (employee) => employee.address)
    employee : Employee

}
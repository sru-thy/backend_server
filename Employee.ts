import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Address } from "./Address";


@Entity("employees")
class Employee {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string;
    @Column()
    email: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @OneToMany(() => Address,(address) => (address.employee))
    address: Address[]
}

export default Employee
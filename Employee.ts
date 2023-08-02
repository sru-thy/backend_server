import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, DeleteDateColumn } from "typeorm";
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
    @DeleteDateColumn()
    deletedAt : Date;
    // @OneToMany(() => Address,(address) => (address.employee))
    // address: Address[]
}

export default Employee
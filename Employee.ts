import { Entity } from "typeorm";

@Entity()
class Employee {
    id: number;
    name:string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export default Employee
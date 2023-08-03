import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entity/employee.entity";
const mpath = 'dist/db/migrations/*.js'

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 8765,
    username: "postgres",
    password: "postgres",
    database: "training",
    entities: [Employee],
    migrations: [mpath],
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
  });

  export default AppDataSource
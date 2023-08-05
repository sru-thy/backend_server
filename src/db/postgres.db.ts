import * as dotenv from "dotenv";
dotenv.config({path: "dist/.env" });
import { DataSource } from "typeorm";


import { SnakeNamingStrategy } from "typeorm-naming-strategies";
const mpath = 'dist/db/migrations/*.js'
const epath = 'dist/entity/*.js'

const port = Number(process.env.POSTGRES_PORT);
console.log(port)

const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [epath],
    migrations: [mpath],
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
  });

  export default AppDataSource
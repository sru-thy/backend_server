import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
const mpath = 'dist/db/migrations/*.js'
const epath = 'dist/entity/*.js'

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [epath],
    migrations: [mpath],
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
  });

  export default AppDataSource
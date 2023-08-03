import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
const mpath = 'dist/db/migrations/*.js'
const epath = 'dist/entity/*.js'

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 8765,
    username: "postgres",
    password: "postgres",
    database: "training",
    entities: [epath],
    migrations: [mpath],
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
  });

  export default AppDataSource
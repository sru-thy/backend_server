import * as dotenv from "dotenv";
dotenv.config({path: __dirname + "/.env" });
import "reflect-metadata";
import express from "express";
import loggerMiddleware from "./middleware/loggerMiddleware";
import employeeRoute from "./Routes/employee.route";
import AppDataSource from "./db/postgres.db";
import errorMidlleware from "./middleware/errorMiddleware";
import departmentRoute from "./Routes/department.route";
import { Role } from "./utils/role.enum";
import logger from "./utils/winstonLogger";


const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use("/api/employees", employeeRoute);
server.use("/api/departments", departmentRoute);

server.get("/", (req, res) => {
  logger.info("GET on /")
  res.status(200).send("this is an employee management site");
});

server.get("/api/roles", (req,res)=>{
  res.status(200).send(Role)
})

server.use(errorMidlleware);

(async () => {
  await AppDataSource.initialize();
  server.listen(3000, () => {
    logger.info("server is listening to 3000");
  });
})();

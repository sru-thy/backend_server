import "reflect-metadata"
import express from "express";
import loggerMiddleware from "./middleware/loggerMiddleware";
import employeeRoute from "./Routes/employee.route";
import AppDataSource from "./db/postgres.db";


const server = express();
server.use(express.json())
server.use(loggerMiddleware)


server.use('/employees',employeeRoute)

server.get("/", (req, res) => {
    console.log(req.url);
    res.status(200).send("this is an employee management site");
  });


(async() => {
    await AppDataSource.initialize();
    server.listen(3000, () => {
        console.log("server is listening to 3000");
      });
})()



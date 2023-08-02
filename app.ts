import "reflect-metadata"
import express from "express";
import {employeeRouter} from "./employee-router"
import loggerMiddleware from "./loggerMiddleware";


const server = express();
server.use(express.json())
server.use(loggerMiddleware)


server.use('/employees',employeeRouter)

server.get("/", (req, res) => {
    console.log(req.url);
    res.status(200).send("this is an employee management site");
  });

server.listen(3000, () => {
  console.log("server is listening to 3000");
});

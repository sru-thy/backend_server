import express from "express";

const employeeRouter = express.Router();

import Employee from "./Employee";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import AppDataSource from "./data-source";

var count = 2;

const employee: Employee[] = [
  {
    id: 1,
    name: "Name1",
    email: "email1@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    address : []
  },
  {
    id: 2,
    name: "Name2",
    email: "email2@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    address:[]
  },
];

const empRepository = AppDataSource.getRepository(Employee);

employeeRouter.get("/", async (req, res) => {
  console.log(req.url);

  const result = await empRepository.find();
  res.status(200).send(result);
});

employeeRouter.get("/:id", async (req, res) => {
  console.log(req.url);
  const employee = await empRepository.findOneBy({ id: Number(req.params.id) });
  res.status(200).send(employee);
});

employeeRouter.post("/", async (req, res) => {
  console.log(req.url);
  const newEmployee = new Employee();
  newEmployee.name = req.body.name;
  newEmployee.email = req.body.email;
  const result = await empRepository.save(newEmployee);
  res.status(201).send(result);
});

employeeRouter.put("/:id", async (req, res) => {
  const employeetoupdate = await empRepository.findOneBy({
    id: Number(req.params.id),
  });
  employeetoupdate.email = req.body.email;
  employeetoupdate.name = req.body.name;
  const result = await empRepository.save(employeetoupdate);
  res.status(201).send(result);
});

employeeRouter.delete("/:id", async (req, res) => {
  console.log(req.url);
  const employeetodelete = await empRepository.findOneBy({
    id: Number(req.params.id),
  });
  const result = await empRepository.remove(employeetodelete);
  res.status(204).send("employee deleted");
});

export { employeeRouter };

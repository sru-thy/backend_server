import express from "express";

const employeeRouter = express.Router();

import Employee from "./Employee";

var count = 2;

const employee: Employee[] = [
  {
    id: 1,
    name: "Name1",
    email: "email1@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Name2",
    email: "email2@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

import { Client } from "pg";

employeeRouter.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send(employee);
});

employeeRouter.get("/:id", async (req, res) => {
  console.log(req.url);
  const client = new Client({
    host: "localhost",
    port: 8765,
    database: "training",
    user: "postgres",
    password: "postgres",
  });
  await client.connect();
  const result = await client.query("SELECT * FROM employees WHERE id=$1", [
    req.params.id,
  ]);

//   const rawEmployee = result.rows[0];

//   const employee = new Employee();
//   employee.id =rawEmployee.id;
//   employee.createdAt = rawEmployee.createdAt;


  res.status(200).send(result.rows[0]);
  await client.end();
});

employeeRouter.post("/", (req, res) => {
  console.log(req.url);
  const newEmployee = new Employee();

  newEmployee.name = req.body.name;
  newEmployee.email = req.body.email;
  newEmployee.id = ++count;
  newEmployee.createdAt = new Date();
  newEmployee.updatedAt = new Date();
  employee.push(newEmployee);
  res.status(201).send(newEmployee);
});

employeeRouter.put("/:id", (req, res) => {
  const emp = employee.find((emp) => emp.id === Number(req.params["id"]));
  emp.email = req.body.email;
  emp.name = req.body.name;
  emp.updatedAt = new Date();
  res.status(201).send("employee updated");
});

employeeRouter.delete("/:id", (req, res) => {
  console.log(req.url);
  const index = employee.findIndex((x) => x.id.toString() === req.params.id);
  employee.splice(index, 1);
  res.status(204).send("employee deleted");
});

export { employeeRouter };

import { DataSource } from "typeorm";
import { EmployeeRepository } from "../../repository/employee.repository";
import { EmployeeService } from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";
import HttpException from "../../exceptions/http.exception";
import { Role } from "../../utils/role.enum";
import { Address } from "../../entity/address.entity";
import UpdateEmployeeDto from "../../dto/update-employee.dto";
import { jwtPayload } from "../../utils/jwtPayload.type";
import Jwt from "jsonwebtoken";

describe("employee service tests", () => {
  let employeeService: EmployeeService;
  let employeeRepository: EmployeeRepository;
  beforeAll(() => {
    const dataSource: DataSource = {
      getRepository: jest.fn(),
    } as unknown as DataSource;
    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    );

    employeeService = new EmployeeService(employeeRepository);
  });

  describe("Test for get Employee", () => {
    test("test employee for id 1 | Throw Error", async () => {
      const mockFunction = jest.fn();
      when(mockFunction).calledWith({ id: 1 }).mockResolvedValueOnce(null);
      employeeRepository.findOneBy = mockFunction;
      expect(
        async () => await employeeService.getEmployeeByID(1)
      ).rejects.toThrowError();
    });
    test("test employee for id 1 | returns employee", async () => {
      const mockFunction = jest.fn();
      when(mockFunction)
        .calledWith({ id: 1 })
        .mockResolvedValueOnce({ id: 123 });
      employeeRepository.findOneBy = mockFunction;
      expect(await employeeService.getEmployeeByID(1)).toStrictEqual({
        id: 123,
      });
    });
  });

  describe("Test for get all employees", () => {
    test("test should return all users succesfully", async () => {
      const spy = jest.spyOn(employeeRepository, "find");
      spy.mockResolvedValue([]);
      const users = await employeeRepository.find();
      expect(spy).toBeCalledTimes(1);
      expect(users).toEqual([]);
    });
  });

  test("test for employee all", async () => {
    const exception = new HttpException(404, `Employees found`);
    const mockedFunction = jest.fn();
    when(mockedFunction)
      .mockResolvedValue({
        id: 1,
        createdAt: "2023-08-06T23:53:42.472Z",
        updatedA: "2023-08-06T23:53:42.472Z",
        deletedAt: null,
        name: "Aavani",
        username: "aavu",
        password:
          "$2b$10$a4f17NOQojBG6IqxOQfaYOW1heaNctPyHNDoiVr74jeHjg6JHs2tO",
        joiningDate: "11/02/2012",
        experience: 8,
        role: "admin",
        address: {
          id: 5,
          createdAt: "2023-08-06T23:53:42.472Z",
          updatedAt: "2023-08-06T23:53:42.472Z",
          deletedAt: null,
          line1: "Edachira",
          line2: "Kakkanad",
          state: "Kerala",
          country: "India",
          pincode: "682024",
        },
      });
    employeeRepository.find = mockedFunction;
    const emp = await employeeService.getAllEmployees();
    expect(emp).toStrictEqual({
      id: 1,
      createdAt: "2023-08-06T23:53:42.472Z",
      updatedA: "2023-08-06T23:53:42.472Z",
      deletedAt: null,
      name: "Aavani",
      username: "aavu",
      password: "$2b$10$a4f17NOQojBG6IqxOQfaYOW1heaNctPyHNDoiVr74jeHjg6JHs2tO",
      joiningDate: "11/02/2012",
      experience: 8,
      role: "admin",
      address: {
        id: 5,
        createdAt: "2023-08-06T23:53:42.472Z",
        updatedAt: "2023-08-06T23:53:42.472Z",
        deletedAt: null,
        line1: "Edachira",
        line2: "Kakkanad",
        state: "Kerala",
        country: "India",
        pincode: "682024",
      },
    });
  });

  test("Create Employee", async () => {
    const newEmployee = new Employee();
    newEmployee.username = "aavu";
    newEmployee.name = "Aavani";
    newEmployee.password = "123";
    newEmployee.role = Role.ADMIN;
    newEmployee.experience = 8;
    newEmployee.joiningDate = "11/02/2012";
    newEmployee.departmentId = 5;

    const newAddress = new Address();
    newAddress.line1 = "LINE1";
    newAddress.line2 = "Line2";
    newAddress.state = "state";
    newAddress.country = "contry";
    newAddress.pincode = "12345";
    newEmployee.address = newAddress;

    const mockedFunction = jest.fn();
    when(mockedFunction).mockResolvedValue(newEmployee);
    employeeRepository.createEmployee = mockedFunction;
    const emp = await employeeService.createEmployee(
      "Aavani",
      "aavu",
      "123",
      Role.ADMIN,
      newAddress,
      8,
      "11/02/2012",
      "5"
    );
    expect(emp).toStrictEqual(newEmployee);
  });

  test("update Employee", async () => {
    const newEmployee = new UpdateEmployeeDto();
    newEmployee.username = "aavu";
    newEmployee.name = "Aavani";
    newEmployee.password = "123";
    const mocke = jest.fn();
    when(mocke).calledWith({ id: 1 }).mockResolvedValue(newEmployee);
    employeeRepository.findOneBy = mocke;
    const mockedFunction = jest.fn();
    when(mockedFunction).mockResolvedValue(newEmployee);
    employeeRepository.updateEmployee = mockedFunction;
    const emp = await employeeService.updateEmployee(1, newEmployee);
    expect(emp).toStrictEqual(newEmployee);
  });

  test("delete Employee", async () => {
    const newEmployee = new Employee();
    newEmployee.username = "aavu";
    newEmployee.name = "Aavani";
    newEmployee.password = "123";
    newEmployee.role = Role.ADMIN;
    newEmployee.experience = 8;
    newEmployee.joiningDate = "11/02/2012";
    newEmployee.departmentId = 5;

    const newAddress = new Address();
    newAddress.line1 = "LINE1";
    newAddress.line2 = "Line2";
    newAddress.state = "state";
    newAddress.country = "contry";
    newAddress.pincode = "12345";
    newEmployee.address = newAddress;
    const mockedFunction = jest.fn();
    when(mockedFunction).calledWith({ id: 1 }).mockResolvedValue(newEmployee);
    employeeRepository.findOneBy = mockedFunction;
    const mock = jest.fn();
    when(mock).calledWith(newEmployee).mockResolvedValueOnce("");
    employeeRepository.deleteEmployee = mock;
    const emp = await employeeService.deleteEmployee(1);
    expect(emp).toStrictEqual("");
  });

  test("test update employee | Throw Error", async () => {
    const newEmployee = new UpdateEmployeeDto();
    newEmployee.username = "aavu";
    newEmployee.name = "Aavani";
    newEmployee.password = "123";
    const mockFunction = jest.fn();
    when(mockFunction).calledWith({ id: 1 }).mockResolvedValueOnce(null);
    employeeRepository.findOneBy = mockFunction;
    expect(
      async () => await employeeService.updateEmployee(1, newEmployee)
    ).rejects.toThrowError();
  });

  test("test delete | Throw Error", async () => {
    const newEmployee = new Employee();
    newEmployee.username = "aavu";
    newEmployee.name = "Aavani";
    newEmployee.password = "123";
    newEmployee.role = Role.ADMIN;
    newEmployee.experience = 8;
    newEmployee.joiningDate = "11/02/2012";
    newEmployee.departmentId = 5;

    const newAddress = new Address();
    newAddress.line1 = "LINE1";
    newAddress.line2 = "Line2";
    newAddress.state = "state";
    newAddress.country = "contry";
    newAddress.pincode = "12345";
    newEmployee.address = newAddress;
    const mockFunction = jest.fn();
    when(mockFunction).calledWith({ id: 1 }).mockResolvedValueOnce(null);
    employeeRepository.findOneBy = mockFunction;
    expect(
      async () => await employeeService.deleteEmployee(1)
    ).rejects.toThrowError();
  });

  test("login", async () => {
    const newEmployee = new Employee();
    newEmployee.username = "aavu";
    newEmployee.name = "Aavani";
    newEmployee.password = "$2a$12$qChNCwjf/UQbxwkG1KHGleaa7NTJx.DuOwUBKoFCgPcoaUQzxuAoa";
    newEmployee.role = Role.ADMIN;
    newEmployee.experience = 8;
    newEmployee.joiningDate = "11/02/2012";
    newEmployee.departmentId = 5;

    const newAddress = new Address();
    newAddress.line1 = "LINE1";
    newAddress.line2 = "Line2";
    newAddress.state = "state";
    newAddress.country = "contry";
    newAddress.pincode = "12345";
    newEmployee.address = newAddress;

    const mockedFunction = jest.fn();
    when(mockedFunction).calledWith({ username : "aavu"}).mockResolvedValue(newEmployee);
    employeeRepository.findOneBy = mockedFunction;
    const emp = await employeeService.loginEmployee("aavu", "123");
    expect({token: "ss",employeeDetails: newEmployee});
  });
  



});

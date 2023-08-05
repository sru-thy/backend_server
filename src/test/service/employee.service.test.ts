import { DataSource } from "typeorm";
import { EmployeeRepository } from "../../repository/employee.repository";
import { EmployeeService } from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";

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
});

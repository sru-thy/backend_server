import { DataSource } from "typeorm";
import { DepartmentRepository } from "../../repository/department.repository";
import { DepartmentService } from "../../service/department.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";
import HttpException from "../../exceptions/http.exception";
import { Role } from "../../utils/role.enum";
import { Address } from "../../entity/address.entity";
import UpdateDepartmentDto from "../../dto/update-department.dto";
import { jwtPayload } from "../../utils/jwtPayload.type";
import Jwt from "jsonwebtoken";
import Department from "../../entity/department.entity";

describe("employee service tests", () => {
  let departmentService: DepartmentService;
  let departmentRepository: DepartmentRepository;
  beforeAll(() => {
    const dataSource: DataSource = {
      getRepository: jest.fn(),
    } as unknown as DataSource;
    departmentRepository = new DepartmentRepository(
      dataSource.getRepository(Department)
    );

    departmentService = new DepartmentService(departmentRepository);
  });

  describe("Test for get Department", () => {
    test("test dep for id 1 | Throw Error", async () => {
      const mockFunction = jest.fn();
      when(mockFunction).calledWith({ id: 1 }).mockResolvedValueOnce(null);
      departmentRepository.findDepartment = mockFunction;
      expect(
        async () => await departmentService.getDepartmentByID(1)
      ).rejects.toThrowError();
    });
    test("test dep for id 1 | returns dep", async () => {
      const mockFunction = jest.fn();
      when(mockFunction).calledWith(1).mockResolvedValue({ id: 1, name: "HR" });
      departmentRepository.findDepartment = mockFunction;
      expect(await departmentService.getDepartmentByID(1)).toStrictEqual({
        id: 1,
        name: "HR",
      });
    });
  });

  describe("Test for get all dep", () => {
    test("test for dep all", async () => {
      const mockedFunction = jest.fn();
      when(mockedFunction).calledWith().mockResolvedValue({
        id: 1,
        createdAt: "2023-08-06T23:53:42.472Z",
        updatedA: "2023-08-06T23:53:42.472Z",
        deletedAt: null,
        name: "HR",
      });
      departmentRepository.findAllDepartments = mockedFunction;
      const emp = await departmentService.getAllDepartments();
      expect(emp).toStrictEqual({
        id: 1,
        createdAt: "2023-08-06T23:53:42.472Z",
        updatedA: "2023-08-06T23:53:42.472Z",
        deletedAt: null,
        name: "HR",
      });
    });
  });

  test("Create Department", async () => {
    const newDepartment = new Department();
    newDepartment.name = "HR";

    const mockedFunction = jest.fn();
    when(mockedFunction).mockResolvedValue(newDepartment);
    departmentRepository.createDepartment = mockedFunction;
    const emp = await departmentService.createDepartment("HR");
    expect(emp).toStrictEqual(newDepartment);
  });

  test("update Department", async () => {
    const newDep = new UpdateDepartmentDto();
    newDep.name = "HR";
    const mocke = jest.fn();
    when(mocke).calledWith(1).mockResolvedValue(newDep);
    departmentRepository.findDepartment = mocke;
    const mockedFunction = jest.fn();
    when(mockedFunction).mockResolvedValue(newDep);
    departmentRepository.updateDepartment = mockedFunction;
    const dep = await departmentService.updateDepartment("HR",1);
    expect(dep).toStrictEqual(newDep);
  });

});

import { when } from "jest-when";
import { MathUtil } from "../utils/main.util";

describe("Test Average function", () => {
  describe("Test average succes case", () => {
    test("Test average 4+4 success case", () => {
      MathUtil.sum = jest.fn().mockReturnValueOnce(8);
      expect(MathUtil.average(4, 4)).toBe(4);
    });
    test("Test average 4+4 success case", () => {
    const mockedFunction = jest.fn()
      MathUtil.sum = jest.fn()
      when(mockedFunction).calledWith(4,4).mockResolvedValueOnce(8)
      expect(MathUtil.average(4, 4)).toBe(4);
    });
  });
  test("Test average failure case", () => {
    expect(MathUtil.average(4, 4)).not.toBe(3);
  });
});

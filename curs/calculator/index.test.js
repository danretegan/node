import CalculatorService from "./index.js";

describe("Calculator", () => {
  it("adds up", () => {
    expect(CalculatorService.add(1, 2)).toBe(3);
  });
});

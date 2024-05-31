import add from "./index.js";

describe("Calculator", () => {
  it("adds up", () => {
    expect(add(1, 2)).toBe(3);
  });
});

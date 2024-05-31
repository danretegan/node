const pow = require("./pow");

describe("hooks", function () {
  beforeAll(() => {
    console.log("1.Rularea codului necesar INAINTEA TUTUROR testelor.");
  });

  afterAll(() => {
    console.log("2.Rularea codului necesar DUPA finalizarea TUTUROR testelor.");
  });

  beforeEach(() => {
    console.log("3.Rularea codului necesar INAINTEA FIECARUI test.");
  });

  afterEach(() => {
    console.log("4.Rularea codului necesar DUPA finalizarea FIECARUI test.");
  });

  test("1 to power 2 to equal 1", () => {
    console.log("1 to power 2 to equal 1");

    expect(pow(1, 2)).toBe(1);
  });

  test("3 to power 2 to equal 9", () => {
    console.log("3 to power 2 to equal 9");

    expect(pow(3, 2)).toBe(9);
  });
});

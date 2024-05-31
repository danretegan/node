const colors = require("colors");
const pow = require("./pow");

describe("hooks", function () {
  beforeAll(() => {
    console.log(
      colors.bgBlue.bold.white(
        "1. Rularea codului necesar INAINTEA TUTUROR testelor."
      )
    );
  });

  afterAll(() => {
    console.log(
      colors.bgMagenta.bold.white(
        "2. Rularea codului necesar DUPA finalizarea TUTUROR testelor."
      )
    );
  });

  beforeEach(() => {
    console.log(
      colors.bgGreen.bold.white(
        "3. Rularea codului necesar INAINTEA FIECARUI test."
      )
    );
  });

  afterEach(() => {
    console.log(
      colors.bgYellow.bold.black(
        "4. Rularea codului necesar DUPA finalizarea FIECARUI test."
      )
    );
  });

  test("1 to power 2 to equal 1", () => {
    console.log(colors.bgCyan.bold.black("Test 1: 1 to power 2 equal 1"));

    expect(pow(1, 2)).toBe(1);
  });

  test("3 to power 2 to equal 9", () => {
    console.log(colors.bgRed.bold.white("Test 2: 3 to power 2 equal 9"));

    expect(pow(3, 2)).toBe(9);
  });
});

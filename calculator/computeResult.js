export function computeResult(primulNumar, alDoileaNumar, operator) {
  switch (operator) {
    case "+":
      return primulNumar + alDoileaNumar;

    case "-":
      return primulNumar - alDoileaNumar;

    case "*":
      return primulNumar * alDoileaNumar;

    case "/":
      return primulNumar / alDoileaNumar;

    default:
      console.log(
        `Operatorul introdus: "${operator}" nu este cunoscut! Introduceti: +, -, * sau /. Va multumesc.`
      );
  }
}

//TODO Verificam daca valoarea introdusa este un numar:

export function isNumber(number) {
  if (!isNaN(number)) {
    return true;
  }
  return false;
}

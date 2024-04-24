//TODO Verificam daca valoarea introdusa este un numar:

function isNumber(number) {
  if (!isNaN(number)) {
    return true;
  }
  return false;
}

// Exportam functia isNumber folosind CommonJS (module.exports):
module.exports = {
  isNumber,
};

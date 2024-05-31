module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true, // Adaugam jest: true, ca sa nu primim erori
  },
  extends: ["standard", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};

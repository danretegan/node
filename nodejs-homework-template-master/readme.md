## GoIT Node.js Course Template Homework

### Comenzi:

- `npm start` &mdash; pornește serverul în modul production.
- `npm run start:dev` &mdash; pornește serverul în modul dezvoltare (development).
- `npm run lint` &mdash; rulează verificarea codului cu ESLint, este necesar să se ruleze înaintea fiecărui PR și să se corecteze toate erorile linterului.
- `npm lint:fix` &mdash; aceeași verificare a linterului, dar cu corecții automate pentru erorile simple.

### Testare:

- Instalam dependinte

```bash
npm i jest supertest --save-dev
```

- In package.json:

```json
"scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "test:dev": "node --experimental-vm-modules node_modules/jest/bin/jest.js --watch",
},
"jest": {
  "transform": {}
}
```

- In .eslintrc modificam in:

```javascript
{
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true,
    "jest": true // Adaugam jest: true, ca sa nu primim erori
  },
  "extends": ["standard", "prettier"],
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {}
}
```

- Cream folder `__tests__`
- Cream fisier fisier.test.js
- Adaugam teste:

```javascript
import request from "supertest";
import express from "express";
import productsRouter from "../routes/api/products";

// eslint-disable-next-line
const app = new express();
app.use("/products", productsRouter);

describe("My App Routes", function () {
  it("responds to /", async () => {
    const res = await request(app).get("/products");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(401);
  });
});
```

- Daca vrem sa testam un singur fisier de test:

```bash
npm run test:dev /__tests__/routes/auth.test.js
```

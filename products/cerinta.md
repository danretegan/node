---
title: Exercitiu - Lectia 2
description: Exercitii pentru aplicatii din linia de comanda;
tags:
  - exercise
  - nodejs
  - learning
---

# Exercitiu - Lectia 2 ✏️

## Pasul 1

- Inițializează proiectul folosind comanda npm init.
- Creează fișierul index.js la rădăcina proiectului.
- Adaugă pachetul nodemon ca o dependenţă de dezvoltare (devDependencies).
- În fișierul package.json adaugă scripturi pentru a porni index.js.
  - Scriptul start, pornește index.js folosind node.
  - Scriptul start:dev, pornește index.js folosind nodemon.

## Pasul 2

- Creează folderul db la rădăcina proiectului.
- Creeaza un fisier products.json plasându-l în folderul db.
- La rădăcina proiectului, creează fișierul productsService.js.
  - Importă modulele fs și path pentru a lucra cu sistemul de fișiere.
  - Declară variabila productsPath și atribuie-i ca valoare calea către fișierul products.json. Pentru a construi această cale, utilizează metodele furnizate de modulul path.
  - Adaugă funcții pentru a lucra cu colecția de produse (CRUD). În funcții, folosește modulul fs și metodele readFile() și writeFile().

## Pasul 3

Importă modulul productsService.js în fișierul index.js și testează funcțiile pentru lucrul cu produsele.

## Pasul 4

În fișierul index.js se importă pachetul [yargs](https://www.npmjs.com/package/yargs) pentru a parsa argumentele liniei de comandă.

Folosește funcția invokeAction(), care primește tipul acțiunii și argumentele necesare. Funcția apelează metoda necesară din fișierul productsService.js și îi transmite argumentele necesare.

## Pasul 5

Rulează comenzile în terminal.

- Obținerea și afișarea întregii liste de contacte sub formă de tabel
  (console.table)

```bash
node index.js --action list
```

- Obținerea unui contact după id

```bash
node index.js --action get --id 5
```

- Adăugarea unui contact

```bash
node index.js --action add --name Mango --type shoes --size 46
```

- Ștergerea unui contact

```bash
node index.js --action remove --id=3
```

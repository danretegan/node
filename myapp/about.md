Folosind comanda:

```bash
$ node app.js
```

aplicația va porni un server și va asculta toate conexiunile de pe portul 3000. ([http://localhost:3000](http://localhost:3000/contact))

Aplicația va răspunde cu “Hello World!” în browser pentru toate cererile adresate la URL (/).

Pentru toate celelalte căi, răspunsul va fi 404 - Not Found. Pentru a gestiona cereri și rute, Express are o serie de funcții încorporate. Routing-ul determină modul în care aplicația va răspunde la o solicitare a clientului spre o anumită adresă URL. Fiecare rută poate avea una sau mai multe funcții de procesare care sunt executate atunci când este accesată.

O rută, conform documentației, are următoarea structură:

`app.METHOD(PATH, HANDLER)`

Unde:
**app** — este o instanță a aplicației express.
**METHOD** — metode HTTP (GET, POST, PUT, PATCH, DELETE).
**PATH** — calea spre server, în cazul nostru este '/'.

**HANDLER** — funcția care urmează să fie executată atunci când ruta este accesată.

Să definim pe scurt pentru ce este folosita fiecare metodă HTTP:

- GET solicită o copie a unei resurse. Cererile care folosesc această metodă pot doar prelua date.
- POST este folosit pentru a trimite entități (date) către o anumită resursă. Deseori provoacă o schimbare de stare sau are efecte secundare asupra serverului.
- PUT înlocuiește toate datele curente a resursei cu cele trimise în această metodă.
- DELETE șterge resursele specificate.
- PATCH este folosit pentru a modifica parțial o resursă.

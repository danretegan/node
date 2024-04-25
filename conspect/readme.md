# Ghicește numărul

Să scriem o aplicație - "Ghicește numărul", unde trebuie să ghicești numărul ales de program, de la 1 la 10. Programul la sfârșit va afișa din câte încercări am reușit.

Vom avea nevoie de unele module standard ca `fs` și `readline`, dar și de două non-standard: `commander` și `colors`; ceea ce înseamnă că trebuie instalate folosind comanda npm.

Întregul program este format din trei funcții. Funcția principală `game()` este funcția jocului care se autoinvocă recursiv până când ghicim numărul generat. În primul rând, includem modulul `colors` (npm i colors) care ne permite să colorăm textul din consolă. După care includem modulul `commander` (npm i commander), aceasta este o soluție complexă pentru crearea interfețelor în linia de comandă:

```js
const { program } = require("commander");
program.option(
  "-f, --file [type]",
  "file for saving game results",
  "results.txt"
);
program.parse(process.argv);
```

Indicăm faptul că, opțional, mai așteptăm și parametrul `-f`, sau sintaxa completă `--file`. Cu alte cuvinte, noi definim rularea programului după forma următoare:

```js
node game.js -f my_log.txt
```

Specificăm că este necesar să punem valoarea `my_log.txt` în `program.file`, dar în același timp indicăm, cu al treilea parametru `program.option`, că dacă parametrul `-f` nu este trecut la pornire, implicit `program.file` va fi egal cu `results.txtimplicit`.

Apoi, inițializăm modulul `readline`. Introducem trei variabile pe care le vom folosi în viitor: `count` este numărului de încercări care au fost necesare pentru a ghici numărul, `logFile` este numele fișierului în care vor fi salvate rezultatele jocului, iar `mind` este un număr generat aleatoriu de la 1 la 10 ce trebuie ghicit.

Funcția `isValid` este responsabilă de validarea valorilor introduse în consolă. Verifică dacă valoarea introdusă este un număr și se află în intervalul de la 1 la 10. Dacă datele sunt valide, atunci funcția returnează adevărat, în caz contrar – fals.

Funcția `log` este responsabilă pentru salvarea rezultatelor. Folosește funcția `appendFile` a modulului `fs` pentru a scrie date. Dacă fișierul există, atunci rezultatele vor fi adăugate la fișierul existent, dacă fișierul nu există, acesta va fi creat. Reține faptul că funcția este asincronă și așteptăm finalizarea operației de salvare a rezultatului.

În cele din urmă, ajungem la funcția principală. În interior se apelează metoda:

```js
rl.question(
'Introdu un număr de la 1 la 10 pentru a ghici răspunsul: '.yellow,
(value) => {...});
```

care ascultă consola și, când este introdusă o valoare, apelează o funcție `callback` care procesează valoarea introdusă.

Dacă nu trece validarea, rulăm din nou funcția jocului:

```js
let a = +value;
if (!isValid(a)) {
  game();
  return;
}
```

Dacă validarea este trecută, atunci incrementăm contorul încercărilor cu 1. Inițial comparăm valoarea introdusă cu cea "generată". Dacă numărul este ghicit, atunci afișăm felicitările și numărul de încercări, apoi folosind funcția `log` salvăm rezultatul într-un fișier și, deoarece funcția returnează un promise, în metoda `finally`, închidem interfața de introducere a numerelor prin `rl.close()`, iar dacă rezultatul nu se potrivește, decurgem la recursivitate până când numărul este ghicit.

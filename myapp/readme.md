# Introducere în Express

**Express** - este un web framework minimalist și flexibil pentru aplicațiile Node.js ce oferă un set complex de funcții pentru a dezvolta aplicații web și mobile. Pune la dispoziție mai multe metode utilitare HTTP și middleware-uri pentru a crea un API sau un website.

## Middleware

Un **middleware** nu este decât o funcție care ia trei argumente:

- un obiect al cererii (`req`),
- un obiect de răspuns (`res`) și
- funcția `next`.

Middleware-ul este executat într-o manieră numită `pipelining`. Imaginează-ți o conductă de apă prin care curge apa. Apa este pompată printr-un capăt al conductei și trece printr-un filtru de la robinet (`middleware`), înainte de a ajunge la destinație - paharul nostru. Un aspect important al acestei analogii este că ordinea contează.

```js
app.use((req, res, next) => {
  console.log("Middleware-ul nostru");
  next();
});
```

Această funcție nu face nimic, doar lasă să treacă fluxul prin ea, totuși mesajul nostru va apărea întotdeauna în consolă.

DEFINIȚIE:

<p>
Funcțiile middleware (middleware) sunt funcții care au acces la obiectul cererii (req), la obiectul răspuns (res) și la următoarea funcție middleware din ciclul "cerere-răspuns" al aplicației. Următoarea funcție middleware este de obicei indicată în variabila next.
</p>

Funcțiile middleware îndeplinesc următoarele sarcini:

- execută un cod.
- poate modifica obiectele request și response.
- poate finaliza ciclul cerere-răspuns și anula procesarea cererii.
- apelează următoarea funcție intermediară de procesare din stack prin executarea funcției next().

IMPORTANT!

<p>
Dacă funcția middleware curentă nu finalizează ciclul "cerere-răspuns", trebuie să apeleze next() pentru a transfera controlul către următoarea funcție middleware. În caz contrar, cererea se va bloca.
</p>

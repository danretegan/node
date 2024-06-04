# Nodemailer

npm install nodemailer

Nodemailer - este un modul cu zero dependențe pentru Node.js folosit la trimiterea de e-mailuri. Principalele sale funcționalități includ (dar nu se limitează doar la acestea):

- Independentă de platforma Node.js
- Securitate, în special livrarea de e-mail folosind TLS / STARTTLS și autentificarea DKIM
- Suportul Unicode
- Conținut HTML și imagini încorporate
- diferite metode de transport a mesajelor pe lângă suportul SMTP.

Nodemailer oferă câteva metode de transport încorporate pentru trimiterea mesajelor:

- sendmail - o comandă obișnuită sendmail pentru mesaje simple.
- SES - pentru gestionarea de e-mailuri cu trafic mare, trimițându-le folosind Amazon SES.
- stream - buffer pentru testare, pentru a returna mesaje.

Dar ne putem crea și propriul mod de transport - acesta se numește `external transportation`.

## Mailbox Setup

SMTP este cel mai comun transportator și îl vom folosi în exemplul nostru atunci când trimitem e-mailuri. Pentru a face acest lucru, vom folosi serviciul de corespondență [Outlook](https://outlook.live.com/owa/). Cu el putem verifica performanța aplicației noastre. Chiar dacă nu ai încă un cont, întregul proces de configurare durează doar câteva minute. După ce ne înregistrăm e-mailul acolo, trebuie configurat astfel încât Nodemailer să poată lucra cu el. Deci e necesar să setăm anumite permisiuni.

Prin urmare, poți folosi o astfel de configurație Nodemailer pentru a crea un transportator Nodeemailer:

```python
const nodemailerConfig ={

host:"smtp.office365.com",

port:587,

secure: false,

auth:{

user: process.env.OUTLOOK_EMAIL,

pass: process.env.OUTLOOK_PASSWORD,

}

}
```

Nu uita să folosești `process.env.OUTLOOK_EMAIL` în câmpul "from" al e-mailului tău.

Verifică folderul **Spam** dacă nu vezi e-mailul pe care l-ai trimis în **Inbox** .

## Trimitere mesajelor

Avem deja tot ce ne trebuie astfel încât Nodemailer să se poată conecta la e-mailul nostru și să înceapă să trimită e-mailuri. Trimiterea unui mesaj folosind Nodemailer necesită trei pași de bază.

### Primul pas

Este necesar să se creeze un Nodemailer transporter În variabila `config`, specificăm parametrii principali și creăm variabila de transport `transporter`

### Al doilea pas

Setăm opțiunile mesajului Nodemailer. În acest pas, trebuie să specificăm expeditorul, destinatarii mesajului și conținutul mesajului nostru. Ceea ce vom facem în variabila `emailOptions`

### Al treilea pas

După ce am creat `transporter` și am configurat mesajul care va fi ulterior trimis, îl putem trimite folosind metoda `sendMail()`:

Codul complet de trimitere a unui e-mail:

```js
const nodemailer = require("nodemailer");

require("dotenv").config();

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "goitnodejs@meta.ua",
    pass: process.env.PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);
const emailOptions = {
  from: "goitnodejs@meta.ua",
  to: "noresponse@gmail.com",
  subject: "Nodemailer test",
  text: "Hello. We are testing sending emails!",
};

transporter
  .sendMail(emailOptions)
  .then((info) => console.log(info))
  .catch((err) => console.log(err));
```

Dacă a fost trimis cu succes, ar trebui să primim un răspuns similar ca în consolă. De fapt, s-a trimis un mesaj de la `goitnodejs@meta.ua` la adresa `noresponse@gmail.com`, care este stocată în câmpul `emailOptions.to`

```text
{
  accepted: [ 'noresponse@gmail.com' ],
  rejected: [],
  envelopeTime: 41,
  messageTime: 56,
  messageSize: 361,
  response: '250 OK id=1kDSBb-0003Z5-IB',
  envelope: { from: 'goitnodejs@meta.ua', to: [ 'noresponse@gmail.com' ] },
  messageId: '<9848972a-ae4d-8b56-c6f6-c645a84139c9@meta.ua>'
}
```

Pentru a trimite text în format HTML, nu sunt necesare atribute suplimentare, trebuie doar de inserat un text HTML în mesaj cu atributul html în loc de atributul text.

INFO

Nu uita că poți trimite nu mai mult de 200 de scrisori pe zi :)

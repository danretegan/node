# Sendgrid

npm install @sendgrid/mail

Când trimitem e-mailuri prin pachetul nodemailer, este posibil să întâmpinăm anumite dificultăți. Aceasta include introducerea emailurilor noastre în spam și respingerea mesajelor noastre de către serverele de e-mail. Suntem limitați de lățimea de bandă a serviciului prin care trimitem e-mailul. Apar restricții privind procesarea unor volume mari de mesaje, iar în cazul nostru, serviciul meta.ua asigură trimiterea doar a 200 de mesaje pe zi. Există probleme de analiză, urmărirea performanței e-mailurilor, modul în care utilizatorii citesc e-mailurile, dacă e-mailurile au ajuns la destinație și așa mai departe.

Soluția este, practic, să folosim un serviciu de corespondență terță care se va ocupa de problemele de mai sus. Există destul de multe servicii pe piață pentru trimiterea mesajelor. Atât librarii populare ca [Amazon Simple Email Service](https://aws.amazon.com/ses) cât și mai puțin cunoscute, cum ar fi [Mailgun](https://www.mailgun.com/), însă enumerandu-le, vom vedea că sunt foarte multe. Toate au propriile beneficii și instrumente SDK pentru programatori. Noi ca exemplu, vom alege [SendGrid](https://sendgrid.com/) de la Twilio.

Ne înregistrăm pe site-ul lor (în timpul înregistrării, poți specifica orice companie). Odată înregistrat, accesăm meniul Settings și selectăm API Keys. Dăm click pe butonul Create API Key. Specificăm un nume de cheie și îl creăm. În fereastra care apare, vei vedea API key. Copie-l și salvează-l într-un fișier, vă fi nevoie pentru a-ți face temele.

În principiu, suntem pregătiți să trimitem mail-uri. O documentație detaliată ne va ajuta în acest sens [citește aici](https://sendgrid.com/docs/for-developers/sending-email/quickstart-nodejs/)

În env var `SENDGRID_API_KEY` vom stoca API key pe care am creat-o anterior. În obiectul `msg`, setează câmpul `to` la o adresă de e-mail validă la care vrem să livrăm mesajul. Modifică valoarea `from` la adresa pe care ai folosit-o în timpul înregistrării. Pentru a trimite un mesaj, parsează acest obiect ca argument la metoda `send()` de la instanța librăriei `sgMail`

INFO

Limita mesajelor trimise, pentru planul gratuit, este 100 de e-mailuri pe zi.

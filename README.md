# Helpdesk WEB aplikacija

Ši aplikacija leidžia įmonės klientams registruoti problemas ar klausimus, stebėti jų būseną, o administratoriui – valdyti užklausas, atsakyti į jas ir administruoti dažniausiai užduodamus klausimus (FAQ).

## Funkcionalumas

- Vartotojų registracija ir prisijungimas (klientas/admin).
- Klientas gali registruoti užklausas, matyti savo užklausų sąrašą ir jų būseną.
- Administratorius gali matyti visas užklausas, keisti jų statusą, atsakyti į jas.
- Vieša FAQ paieška ir atsakymų reitingavimas pagal naudingumą.
- Vartotojo sąsaja pritaikyta SPA (Single Page Application) principu.

## Paleidimo instrukcija

### 1. Duomenų bazė

1. Sukurkite MySQL duomenų bazę, pvz. `helpdesk`.
2. Sukonfigūruokite prisijungimo duomenis `.env` faile `backend` kataloge:

DB_NAME=helpdesk DB_USER=root DB_PASS=JŪSŲ_SLAPTAŽODIS DB_HOST=localhost JWT_SECRET=slaptas_raktas

3. (Neprivaloma) Jei norite, galite naudoti SQL failą rankiniam lentelių sukūrimui (`backend/database/mysql.sql`):

```sql
CREATE DATABASE IF NOT EXISTS helpdesk;
USE helpdesk;

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'client') DEFAULT 'client',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('pateiktas', 'svarstomas', 'ispręstas') DEFAULT 'pateiktas',
    userId INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    answerText TEXT NOT NULL,
    ticketId INT,
    adminId INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ticketId) REFERENCES Tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (adminId) REFERENCES Users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS FAQs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    trustCount INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
2. Backend (NodeJS/Express)
cd backend
npm install
npm start
Serveris paleidžiamas ant http://localhost:5000/

3. Frontend (React)
cd frontend
npm install
npm start
Aplikacija pasiekiama per http://localhost:3000/

4. Prisijungimo duomenys
Administratorius
Vartotojo vardas: admin
Slaptažodis: admin123

Pastaba: Pirmą kartą paleidus sistemą, užregistruokite admin vartotoją per registracijos formą ir pakeiskite jo rolę į admin duomenų bazėje (arba per SQL):

UPDATE Users SET role='admin' WHERE username='admin';
Klientas
Registruokite naują vartotoją per registracijos formą.

API pagrindiniai endpointai
POST /api/users/register – registracija
POST /api/users/login – prisijungimas
POST /api/tickets – naujos užklausos registravimas (klientas)
GET /api/tickets/my – kliento užklausų sąrašas
GET /api/tickets – visos užklausos (admin)
PATCH /api/tickets/:id/status – keisti užklausos statusą (admin)
POST /api/answers – pridėti atsakymą (admin)
GET /api/faq – FAQ paieška
PATCH /api/faq/:id/trust – reitinguoti atsakymą
Kiti patarimai
Jei keičiate duomenų bazės struktūrą, ištrinkite seną DB ir paleiskite backend iš naujo (naudojamas Sequelize automatinis sinchronizavimas).
Jei norite pridėti daugiau administratorių, pakeiskite jų rolę į admin duomenų bazėje.
Sėkmės naudojant Helpdesk sistemą!
```

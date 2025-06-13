# Helpdesk Sistema

## Aprašymas

Helpdesk sistema – tai internetinė pagalbos bilietų (angl. ticket) valdymo platforma, skirta efektyviam klientų užklausų administravimui, DUK (dažniausiai užduodamų klausimų) paieškai ir atsakymų valdymui. Sistema turi administratoriaus ir vartotojo sąsajas.

## Projekto struktūra

```
helpdesk-app/
├── backend/      # Node.js/Express serveris, duomenų bazės modeliai ir maršrutai
├── frontend/     # React aplikacija (vartotojo sąsaja)
```

## Naudojamos technologijos

- Node.js, Express (backend)
- MySQL (duomenų bazė)
- React (frontend)
- Axios (užklausoms tarp front ir back)

## Diegimo instrukcijos

### 1. Backend paleidimas

1. Eikite į `backend` aplanką:
   ```sh
   cd backend
   ```
2. Įdiekite priklausomybes:
   ```sh
   npm install
   ```
3. Paleiskite serverį:
   ```sh
   node server.js
   ```

### Backend paleidimas (alternatyva)

Jei `backend/package.json` yra `start` scriptas, serverį galite paleisti ir taip:

```sh
npm start
```

### 2. Frontend paleidimas

1. Eikite į `frontend` aplanką:
   ```sh
   cd frontend
   ```
2. Įdiekite priklausomybes:
   ```sh
   npm install
   ```
3. Paleiskite React aplikaciją:
   ```sh
   npm start
   ```

### 3. Duomenų bazės paruošimas

1. Sukurkite MySQL duomenų bazę pagal `backend/database/mysql.sql` faile pateiktą struktūrą.
2. Nustatykite prisijungimo duomenis faile `backend/config/db.js`.

### .env failo pavyzdys (backend kataloge)

```
DB_NAME=helpdesk
DB_USER=root
DB_PASS=JŪSŲ_SLAPTAŽODIS
DB_HOST=localhost
JWT_SECRET=slaptas_raktas
```

### Prisijungimo duomenys

- **Administratorius:** užregistruokite vartotoją ir pakeiskite jo rolę į `admin` duomenų bazėje:
  ```sql
  UPDATE Users SET role='admin' WHERE username='admin';
  ```
- **Klientas:** registruokite per registracijos formą.

## Funkcionalumas

- Vartotojų registracija ir prisijungimas
- Bilietų kūrimas, peržiūra ir valdymas
- DUK paieška ir peržiūra
- Administratoriaus panelė: vartotojų, bilietų ir DUK valdymas

## API endpoint'ai

### Vartotojai (`/api/users`)

- `POST /register` – registracija
- `POST /login` – prisijungimas

### Bilietai (`/api/tickets`)

- `POST /` – sukurti naują bilietą (klientas)
- `GET /my` – gauti savo bilietus (klientas)
- `GET /` – gauti visus bilietus (admin)
- `PATCH /:id/status` – keisti bilieto statusą (admin)

### DUK (`/api/faq`)

- `GET /` – gauti visus DUK (galima filtruoti pagal kategoriją ar paiešką)
- `POST /` – pridėti naują DUK (admin)
- `PATCH /:id/trust` – reitinguoti atsakymą

### Atsakymai (`/api/answers`)

- `POST /` – pridėti atsakymą į bilietą (admin)
- `GET /ticket/:ticketId` – gauti visus atsakymus pagal bilieto ID

## Darbo su GitHub instrukcija

1. **Klonuokite projektą iš GitHub:**
   ```sh
   git clone https://github.com/jusu-vartotojas/jusu-repozitorija.git
   cd jusu-repozitorija
   ```
2. **Sukurkite naują šaką (branch):**
   ```sh
   git checkout -b nauja-saka
   ```
3. **Atlikite reikiamus pakeitimus faile/failuose.**

4. **Įtraukite pakeitimus į commit:**
   ```sh
   git add .
   git commit -m "Trumpas pakeitimų aprašymas"
   ```
5. **Išsiųskite (push) šaką į GitHub:**
   ```sh
   git push origin nauja-saka
   ```
6. **GitHub svetainėje sukurkite Pull Request, kad jūsų pakeitimai būtų peržiūrėti ir sujungti su pagrindine šaka.**

> Pastaba: Nepamirškite pakeisti nuorodos į savo GitHub paskyrą ir repozitoriją.

## Kontaktai

Projekto autorius: [Jūsų vardas]
El. paštas: [jūsų@email.com]

---

> Jei turite klausimų ar pastebėjimų, drąsiai kreipkitės!

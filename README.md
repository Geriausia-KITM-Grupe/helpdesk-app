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

## Funkcionalumas

- Vartotojų registracija ir prisijungimas
- Bilietų kūrimas, peržiūra ir valdymas
- DUK paieška ir peržiūra
- Administratoriaus panelė: vartotojų, bilietų ir DUK valdymas

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

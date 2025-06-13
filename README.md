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

## Kontaktai

Projekto autorius: [Jūsų vardas]
El. paštas: [jūsų@email.com]

---

> Jei turite klausimų ar pastebėjimų, drąsiai kreipkitės!

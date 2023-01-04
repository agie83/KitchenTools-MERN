## KitchenTools Webshop

A webshop különböző konyhai eszközöket kínál vásárlóinak. 

### 1. Áttekintés, funkciók

A termékek kategóriák szerint vannak csoportosítva, bárki megtekintheti, de egyelőre csak regisztrált felhasználók tudnak rendelni. A belépett felhasználók a rendelésen kívül tudják módosítani adataikat és megnézhetik korábbi rendeléseiket. Ez a websop egy alap, sokféle továbbfejlesztési lehetőséggel.

**Főoldal**

- Kategória ajánló és egyéb információk

**Webshop**

- A webshop kategóriák szerint mutatja az árucikkeket.
- Adott kategóriára kattintva kilistázódnak a termékek, itt lehetőség van továbbmenni adott termék adatlapjára, vagy egyből hozzá is adhatunk egyet a kosárhoz.
- A termékadatlap megtekinthető, viszont a kosár funkció csak belépést követően használható.
- A gördülékenyebb nézelődés, vásárlás érdekében, belépést követően arra az oldalra navigálja a felhasználót, ahonnan a belépésre irányítottuk.

- A termékadatlapon egyszerre több termék is kosárba tehető.
  A kosárban módosítható a mennyiség, vagy akár törölni is lehet az adott terméket vagy akár a kosár teljes tartalmát.

- Rendelést követően az oldalon egy visszaigazoást kap a felhasználó arról, hogy rendelése sikeres volt.

**Felhasználói fiók**

- A fiókhoz több funkció is tartozik.
- A nem belépett felhasználó a regisztráció és a belépés lehetőségek közül választhat, aki már belépett, a profilját módosíthatja vagy megtekintheti rendeléseit.

- Funkciók:
  - Regisztráció (Név (vezetéknév, keresztnév), e-mail cím és jelszó megadása szükséges. Legerősebb jelszótípust vár, így speciális karakternek is szerepelnie kell benne.)
  - Belépés: A felhasználó a regisztráció során megadott e-mail címmel és jelszóval tud bejelentkezni.
  - Profil: A rendszerben megadott adatait módosíthatja (továbbfejlesztés során további adatokkal bővíthető)
  - Rendelések: A felhasználó rendeléseit mutatja. Több státusza lehet (megrendelve, kifizetve, átvéve), a rendszer egyelőre csak a "megrendelve" lehetőséget kezeli, továbbfejlesztéssel akár automatizáltan, akár adminisztrátor által a több opció is elérhető lehet.

**Elérhetőségek**

A KitchenTools üzletei kerülnek listázásra, bármelyik helyen átvehetőek a rendelések.

### 2. Technológiák

**Backend**

- Node
- Express
- MongoDB
- Json Web Token
- Docker

**Frontend**

- React
- Bootstrap5
- Joi

### 3. Alkalmazás telepítése

### Frontend

- `.env` fájl létrehozása az `.env.example` alapján.
- Parancsok:
  - `yarn install` - függőségek installálása
  - `yarn start` - alkalmazás indítása
- http://localhost:3000/

### Backend

- `.env` fájl létrehozása az `.env.example` alapján.
- Parancsok:

  - `yarn` - függőségek installálása
  - `yarn start` - alkalmazás indítása
  - `yarn test` - teszt fájlok futtatása
  - `yarn lint` - linter futtatása
  - `yarn build` - alkalmazás buildelése

- http://localhost:3030/

### Alkalmazás indítása Docker-rel:

- Parancsok:
  - `docker-compose up` - alkalmazás indítása

### Feltöltés adatokkal (backend)

- `yarn loadData` - Adatbázis feltöltése példa adatokkal

### API dokumentáció

- Swagger: http://your-server/api-docs

# MERN App Backend

## Opis projektu

To jest backend aplikacji stworzonej w technologii MERN (MongoDB, Express.js, React.js, Node.js). Projekt obsługuje logikę serwera, API oraz integrację z bazą danych.

## Wymagania

- Node.js (wersja 14 lub nowsza)
- MongoDB (lokalnie lub w chmurze)

## Instalacja

1. Sklonuj repozytorium:

   ```bash
   git clone <URL_REPOZYTORIUM>
   cd app-backend
   ```

2. Zainstaluj zależności:

   ```bash
   npm install
   ```

3. Skonfiguruj zmienne środowiskowe:
   Utwórz plik `.env` w katalogu głównym i dodaj wymagane zmienne środowiskowe:
   ```
   MONGO_URI=<URL_DO_BAZY_DANYCH>
   PORT=<PORT_SERWERA>
   ```

## Uruchamianie

Aby uruchomić serwer w trybie deweloperskim:

```bash
npm run dev
```

Aby uruchomić serwer w trybie produkcyjnym:

```bash
npm start
```

## Skrypty

- `npm run dev` - uruchamia serwer w trybie deweloperskim z użyciem `nodemon`.
- `npm start` - uruchamia serwer w trybie produkcyjnym.

## Struktura projektu

```
app-backend/
├── controllers/    # Logika kontrolerów
├── models/         # Modele bazy danych
├── routes/         # Definicje tras API
├── middleware/     # Middleware aplikacji
├── config/         # Konfiguracje (np. bazy danych)
├── .env            # Plik zmiennych środowiskowych
└── server.js       # Główny plik serwera
```

## Autor

Jan Banczerowski

## Licencja

Projekt jest licencjonowany na zasadach [MIT](https://opensource.org/licenses/MIT).

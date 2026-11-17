# MLB Stats Central | 2026 Season Tracker

MLB Stats Central lets users explore mock MLB teams, players, and games for the 2026 season.

## Team members

- Mason Biehn
- Dillon Fayas

## Setup

```sh
npm ci
```

To load the mock data, run `database/schema.sql` and `database/seed.sql` in MySQL, then copy `backend/.env.example` to `backend/.env` and set your database connection details.

Run these in separate terminals from repo root:
```sh
npm run dev:backend
npm run dev:frontend
```

## Production build

```sh
npm run build
npm start
```
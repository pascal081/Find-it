# FindIt — Lost & Found

A responsive React + Vite lost-and-found marketplace frontend. It runs in mock mode with local demo data and browser localStorage; no backend is required.

## Requirements
- Node.js 18 or newer
- npm

## Run locally
```bash
npm install
cp .env.example .env
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Demo authentication
Create an account on **Sign up**, or use the seeded demo account:
- Email: `demo@findit.app`
- Password: `password123`

Mock accounts, the current session, and user-submitted reports are stored in localStorage. This is for demonstration only and is **not production-secure**. Do not use real passwords or sensitive personal information.

## Main routes
- `/` — Home
- `/items` — All listings; supports `?type=lost`, `?type=found`, `?category=Electronics`, and `?search=laptop`
- `/items/:id` — Item details
- `/report/lost` and `/report/found` — Protected report forms
- `/my-reports` — Your submitted reports
- `/profile` — Profile
- `/login` and `/signup` — Authentication

## API integration
`src/services/api.js` is the single service boundary for register, login, item listing/detail, lost/found reports, and the current user's reports. Set `VITE_USE_MOCK_API=false` only after the lecturer's API documentation has been mapped into the placeholder functions. Endpoint paths and response shapes are intentionally marked as placeholders. `VITE_API_BASE_URL` is public configuration, not a place for secrets. Never put private API keys in Vite environment variables.

The report form currently stores a selected image as a local data URL for the mock experience. Replace this with `FormData` and the lecturer's documented upload contract when available.

## Project structure
```text
findit/
├── public/images/          # Local demo photographs
├── src/
│   ├── assets/images/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   ├── main.jsx
│   └── theme.js
├── .env.example
├── .gitignore
├── index.html
└── package.json
```

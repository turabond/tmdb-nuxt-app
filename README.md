# TMDB Nuxt 3 Movie Browser

Netflix-style SSR web app for browsing trending movies and TV shows using TMDB API.

## Features

- Nuxt 3 + Vue 3 (Composition API) + TypeScript
- Server-Side Rendering (SSR)
- Firebase Authentication (email/password)
- Firestore bookmarks per user with realtime sync
- Responsive, dark-themed UI with Tailwind CSS (no UI libraries)

## Project structure

- `/pages` — routes: `/trending`, `/trending/:mediaType/:mediaId`, `/bookmarks`, `/login`
- `/composables` — auth, user state, bookmarks management
- `/middleware` — auth and guest guards
- `/plugins` — firebase auth initialization
- `/components` — UI components (buttons, tabs, login button)
- `nuxt.config.ts` — config including Tailwind, Firebase env variables

## Environment variables
Create a `.env` file in the root folder with the following variables

TMDB_API_KEY=your_tmdb_api_key_here

FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id

## Setup

1. Clone repo  
2. Create `.env` with your TMDB and Firebase credentials (see `.env.example`)  
3. `npm install`  
4. `npm run dev`  
5. Open `http://localhost:3000`

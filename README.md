# whoPlays

**Final project for the Software Engineering course at [Coyotiv School of Software Engineering](https://coyotiv.com/).**

whoPlays is a full-stack music event discovery app that lets users browse upcoming concerts by city and preview artists through embedded Spotify players. Built over the course of the program, it represents the cumulative application of everything learned — from backend API design and database modeling to frontend component architecture, third-party API integration, and containerized deployment.

The stack is JavaScript end-to-end: a **Vue.js** SPA on the frontend and a **Node.js** + Express REST API on the backend, with MongoDB for persistence. See the [full tech stack](#tech-stack) below.

The app was deployed on Google Cloud during the course and is **no longer live**, but can be run locally using Docker.

> **Note:** Some parts of the app are intentionally hardcoded — cities are fixed to Berlin and São Paulo, events are pre-seeded rather than pulled from a live source, and several flows are simplified. This was a deliberate trade-off: the goal was to focus on specific learning goals, not to ship a production-ready product.

---

## What It Does

- Browse music events filtered by city
- Expandable event cards showing artist lineup, date, and venue
- Spotify artist embed players — click an event to hear previews without leaving the app

---

## Skills Practiced

### Node.js & Backend Development
Worked with Node.js as the server runtime — managing packages with npm, handling asynchronous I/O, and structuring a backend application across multiple modules. Built a RESTful API with Express, including route structure, middleware setup (CORS, logging, env config), and integration with an external API. Practiced separating concerns between routing, data models, and business logic.

### Database Modeling
Modeled application data with MongoDB and Mongoose — defining schemas, handling relationships (events referencing users via a `favoritedBy` array), and working with an ODM to abstract raw queries. Seeded the database with realistic data to simulate a production-like environment.

### Third-Party API Integration (Spotify OAuth)
Implemented the Spotify OAuth Client Credentials flow: exchanging credentials for a short-lived access token, storing it in app memory, and using it to search the Spotify API for artist IDs. The backend returns those IDs to the frontend, which renders official Spotify embed iframes — no user login required.

### Frontend Architecture with Vue.js
Built a Single Page Application with Vue 2, applying component-based design: reusable `EventCard` and `EventPlayer` components, a Vuex store for shared state, and Vue Router for client-side navigation. Used lazy-loading for a non-critical route (`/about`) to practice performance optimization.

### Asynchronous JavaScript
Used `Promise.all()` on the backend to fetch Spotify data for multiple artists concurrently rather than sequentially — a practical application of parallel async execution.

### Containerization with Docker
Configured a multi-container setup with Docker Compose: separate containers for the Vue dev server, Express backend, and MongoDB, with volume mounts for live code reloading during development. Wrote Dockerfiles for both frontend and backend using lightweight Alpine images.

### Testing
Wrote unit tests with Jest for the Event model, covering creation, property updates, array handling, and favorites tracking. Practiced isolating model logic from the HTTP layer to make tests fast and focused.

### CI/CD & Deployment
Set up a GitHub Actions workflow for automated frontend builds and deployed the app to Google Cloud. Practiced the deployment pipeline from code push to live environment.

---

## Tech Stack

### Frontend
| Technology | How it was used |
|---|---|
| **Vue.js 2** | UI framework; the whole frontend is a Vue SPA |
| **Vue Router** | Handles client-side navigation between home, event detail, and about pages |
| **Vuex** | Stores shared state (base API URL, eventually events and city filter) |
| **Bootstrap 5 + Bootstrap-Vue** | Responsive grid layout and pre-built UI components |
| **Axios** | Makes HTTP requests from components to the Express backend |
| **Pug** | HTML templating language used in Vue components (`<template lang="pug">`) |
| **Sass/SCSS** | CSS preprocessing for component styles |

### Backend
| Technology | How it was used |
|---|---|
| **Node.js** | JavaScript runtime for the server |
| **Express** | REST API framework; handles routing, middleware, and request/response cycle |
| **MongoDB** | NoSQL database storing events and user data |
| **Mongoose** | ODM layer; defines schemas, handles queries, and manages the DB connection |
| **Spotify Web API** | Searched for artist IDs using OAuth Client Credentials flow |
| **Morgan** | Logs incoming requests for debugging and observability |
| **dotenv** | Loads environment variables (DB URI, Spotify credentials) from `.env` |
| **CORS** | Allows the Vue dev server (port 8080) to call the Express API (port 3000) |

### Infrastructure
| Technology | How it was used |
|---|---|
| **Docker + Docker Compose** | Containerizes the full stack; dev and production compose files |
| **Google Cloud** | Original production deployment (free trial, now expired) |
| **GitHub Actions** | CI/CD pipeline for automated frontend builds and deployment |
| **Jest** | Unit test runner for backend model tests |

---

## Architecture

```
whoplays/
├── frontend/               # Vue.js Single Page Application (port 8080)
│   └── src/
│       ├── components/     # EventCard.vue, EventPlayer.vue
│       ├── views/          # HomeView, EventView, AboutView
│       ├── router/         # Vue Router config
│       └── store/          # Vuex store
├── backend/                # Express REST API (port 3000)
│   └── src/
│       ├── models/         # Event and User Mongoose schemas
│       ├── routes/         # /events and /users route handlers
│       └── app.js          # Express setup + Spotify OAuth initialization
├── docker-compose.yml          # Production setup
├── docker-compose.dev.yml      # Development setup (with volume mounts)
└── initialize-events.json      # Seed data (30+ events)
```

**Data flow for event detail:**
1. User clicks an event card → frontend calls `GET /events/:id`
2. Backend fetches the event from MongoDB, then queries Spotify for each artist's ID using `Promise.all()`
3. Returns `{ event, artistIDs[] }` to the frontend
4. Frontend renders an official Spotify embed iframe per artist (`open.spotify.com/embed/artist/:id`)

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/events` | List all events; supports `?city=Berlin` filter |
| `GET` | `/events/:id` | Get event details + Spotify artist IDs |
| `POST` | `/events/add` | Create a new event |
| `GET` | `/events/token` | Return the cached Spotify access token |

---

## Running Locally

**Prerequisites:** Docker and Docker Compose.

```bash
# 1. Clone the repo
git clone https://github.com/your-username/whoplays.git
cd whoplays

# 2. Create backend/.env
echo "MONGODB_URI=mongodb://mongo:27017/whoplays
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret" > backend/.env

# 3. Start all services
docker-compose -f docker-compose.dev.yml up
```

Open [http://localhost:8080](http://localhost:8080). The backend runs on port `3000` and MongoDB on `27017`.

> To get Spotify credentials, create a free app at [developer.spotify.com](https://developer.spotify.com/dashboard).

---

## Running Tests

```bash
cd backend
npm install
npm test
```

Tests are written with **Jest** and cover the Event model: creation with required fields, single and multiple artist arrays, property updates, and `favoritedBy` tracking.

---

## About

This project was built as the capstone for the Coyotiv School of Software Engineering course. The aim was to go through the full experience of building a real application — making architecture decisions, integrating external services, writing tests, and deploying to production — not just following a tutorial.

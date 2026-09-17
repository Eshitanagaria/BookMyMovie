# BookMyMovie

A full-stack MERN movie ticket booking platform. Users can browse now-playing and upcoming movies (via TMDB), pick a show, select seats, pay with Stripe, and get email confirmations  with a full admin panel for managing shows and bookings.

[Live Demo](https://book-my-movie-five.vercel.app/) • [GitHub](https://github.com/Eshitanagaria/BookMyMovie)

## Features

**User**
- Browse now-playing and upcoming movies (pulled live from TMDB)
- View movie details including overview, cast, genres, rating, runtime
- Pick a showtime and select seats on an interactive seat layout
- Secure checkout via Stripe
- Automatic seat release if payment isn't completed within 10 minutes
- Email booking confirmation, and a reminder email before showtime
- Favorite movies and view booking history
- Auth via Clerk (sign up, sign in, profile)

**Admin**
- Role-gated dashboard (Clerk `privateMetadata.role === "admin"`)
- Add new shows with pricing and datetime
- View all shows and all bookings
- Dashboard stats overview

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express 5, MongoDB (Mongoose) |
| Auth | Clerk |
| Payments | Stripe (Checkout + Webhooks) |
| Background jobs | Inngest (user sync, seat release, emails, reminders) |
| Email | Nodemailer (via Brevo SMTP) |
| Movie data | TMDB API |

## Project Structure

```
BookMyMovie/
├── client/          # React + Vite frontend
│   └── src/
│       ├── pages/       # Home, Movies, MovieDetails, SeatLayout, MyBookings, Favorite, admin/...
│       ├── components/  # Shared + admin components
│       └── context/     # App-wide context (auth, currency, base URL)
└── server/          # Express backend
    ├── controller/      # show, booking, user, admin logic + Stripe webhooks
    ├── routes/          # /api/show, /api/booking, /api/user, /api/admin
    ├── models/          # Movie, Show, Booking, User
    ├── middleware/       # Clerk admin-role guard
    ├── inngest/          # Background functions (sync, reminders, email, seat release)
    └── configs/          # DB connection, Nodemailer
```

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB database (Atlas or local)
- Accounts/API keys for: [Clerk](https://clerk.com), [Stripe](https://stripe.com), [TMDB](https://www.themoviedb.org/settings/api), [Inngest](https://www.inngest.com), and an SMTP provider (e.g. [Brevo](https://www.brevo.com))

### 1. Clone the repo
```bash
git clone https://github.com/Eshitanagaria/BookMyMovie.git
cd BookMyMovie
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `server/.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
TMDB_API_KEY=your_tmdb_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

Run the server:
```bash
npm run server   # nodemon, for local dev
# or
npm start
```

### 3. Frontend setup
```bash
cd ../client
npm install
```

Create a `client/.env` file:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000
VITE_CURRENCY=$
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
```

Run the client:
```bash
npm run dev
```

### 4. Stripe webhook (local dev)
Forward Stripe events to your local server with the Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe
```

### 5. Inngest (local dev)
Run the Inngest dev server so background functions (user sync, seat release, emails, reminders) fire locally:
```bash
npx inngest-cli@latest dev
```

## API Overview

| Route | Description |
|---|---|
| `GET /api/show/now-playing` | Now-playing movies from TMDB (admin) |
| `GET /api/show/upcoming` | Upcoming releases from TMDB |
| `POST /api/show/add` | Add a new show (admin) |
| `GET /api/show/all` | All available shows |
| `GET /api/show/:movieId` | Show details for a movie |
| `POST /api/booking/create` | Create a booking |
| `GET /api/booking/seats/:showId` | Occupied seats for a show |
| `GET /api/user/bookings` | Current user's bookings |
| `GET /api/user/favorites` / `POST /api/user/update-favorite` | Manage favorites |
| `GET /api/admin/dashboard` | Dashboard stats (admin) |
| `GET /api/admin/all-shows` / `GET /api/admin/all-bookings` | Admin listings |
| `POST /api/stripe` | Stripe webhook handler |

## Deployment

Both `client/` and `server/` include a `vercel.json`, so each can be deployed independently on Vercel point `VITE_BASE_URL` on the client to your deployed server URL, and set the Stripe webhook endpoint to `https://<your-server>/api/stripe`.

## License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

# PulseFit Studio - Full Stack Class Booking & Studio Platform

PulseFit Studio is a full-stack web application designed for a modern fitness studio. It provides a complete web platform for clients to browse classes, book workout sessions, manage reservations, and for studio admins to manage schedules and member bookings.

Built by **Piyush**.

---

## 🛠 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Axios, React Router v6
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose schemas)
- **Security**: JWT Authentication, Bcrypt password hashing, Express Rate Limit, Helmet, Express Validator
- **Integrations**: Nodemailer (booking confirmation stub), Stripe (test payment intent stub)

---

## ✨ Main Features

### Client Features
- **Home & Catalog**: Hero banner, featured workout programs, and interactive class browser.
- **Search & Filters**: Search classes by title/trainer, filter by category (HIIT, Yoga, Strength, Pilates, Cycling, Recovery), and difficulty level.
- **Booking Flow**: Class selection, date/time slot picker, test mode credit card form, and instant booking confirmation.
- **User Dashboard**: Member profile update, view upcoming/past bookings, and cancel reservations.
- **User Auth**: Signup, Login, Logout, and Forgot Password flow.

### Admin Features
- **Dashboard Analytics**: Revenue overview, active class count, total bookings, and confirmed attendance.
- **Class Management**: Create new workout classes, edit details/schedules, and delete inactive sessions.
- **Reservation Management**: View all customer bookings and update status (Confirmed, Completed, Cancelled).

---

## 🚀 Local Development Setup

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd shadowfox-task3

# Install dependencies for root, server, and client
npm run install:all
```

### 2. Environment Variables

Create `.env` in the `server/` directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/pulsefit_db
JWT_SECRET=my_custom_jwt_secret_key_2026
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

Create `.env` in the `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed Sample Data
Populate MongoDB with default classes, admin, and demo member accounts:
```bash
npm run seed
```

**Seed Credentials**:
- **Admin Account**: `admin@pulsefit.com` / `adminpassword123`
- **Member Account**: `alex@example.com` / `userpassword123`

### 4. Start Development Server
```bash
npm run dev
```
- Frontend app runs on: `http://localhost:5173`
- Backend API runs on: `http://localhost:5000/api`

---

## 📂 Project Directory Structure

```
.
├── package.json              # Monorepo task runner
├── README.md                 # Project documentation
├── server/
│   ├── server.js             # Express entry point
│   ├── config/               # Database connection
│   ├── controllers/          # Route handlers (auth, services, bookings, etc.)
│   ├── middleware/           # Auth check, rate limiting, error handling
│   ├── models/               # Mongoose data schemas (User, Service, Booking, Review)
│   ├── routes/               # Express API endpoints
│   ├── utils/                # Token generation & email helpers
│   └── seed/                 # Seed data script
└── client/
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── context/          # Auth context provider
        ├── services/         # Axios API instance
        ├── components/       # UI components (Navbar, Footer, Cards, Modals)
        └── pages/            # Page views (Home, About, Services, Dashboard, AdminPanel)
```

---

## 📄 License
MIT License - Created for portfolio & client demonstration.

# Timesheet Management System

A production-structured Timesheet Management application built using **Next.js (App Router), TypeScript, NextAuth, and TailwindCSS**.

This project demonstrates scalable architecture, protected routing, modular design, internal API handling, and clean authentication flow.


## 📌 Overview

The application allows authenticated users to:

- Log in using credentials-based authentication
- Access a protected dashboard
- View timesheet entries in a structured table
- Create and update timesheet records
- Experience a clean and responsive UI

The architecture follows real-world best practices while keeping the implementation clear and maintainable.

### Application Flow
UI (Pages & Components)
↓
Client-side API Calls
↓
Internal API Routes (Next.js App Router)
↓
Business Logic & Config (lib/)
↓
Mock Data (Temporary in-memory store)

### Key Architectural Decisions

- App Router (Next.js 16+)
- JWT session strategy for stateless authentication
- Separated `authOptions` into `lib/auth.ts`
- Internal API routes for client-side API handling
- Modular folder structure for scalability
- Clean separation of UI, API, and business logic

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| Authentication | NextAuth (Credentials Provider) |
| Session Strategy | JWT |
| State Management | React Hooks |
| Data Layer | Mock in-memory data |

---

## 🔐 Authentication Flow

1. User submits credentials via login form
2. `signIn()` from NextAuth is triggered
3. Credentials validated against mock users
4. JWT session issued
5. Protected routes validated using `getServerSession`
6. Unauthenticated users redirected to `/login`

Authentication config is isolated inside:

---

## 📊 Features

### Login Page
- Email & password authentication
- Form validation
- Error handling
- Loading states
- Secure JWT session
- Redirect to dashboard on success

### Dashboard
- Server-side session validation
- Timesheet table view
- Columns:
  - Week #
  - Date
  - Status
  - Actions
- Add/Edit modal
- Responsive layout
- Clean UI structure

### Login Page
- Email & password authentication
- Form validation
- Error handling
- Loading states
- Secure JWT session
- Redirect to dashboard on success

### Dashboard
- Server-side session validation
- Timesheet table view
- Columns:
  - Week #
  - Date
  - Status
  - Actions
- Add/Edit modal
- Responsive layout
---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```bash
npm install
.env.local in the project root:
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=http://localhost:3000

Run Development Server
http://localhost:3000

Demo Credentials
Email: test@example.com
Password: 123456

Deployment
npm run build
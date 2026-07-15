# 📄 SyncDocs

> A modern, local-first collaborative document editor built with **Next.js**, **TypeScript**, **Prisma**, **PostgreSQL**, **Dexie**, **React Query**, and **Gemini AI**.

SyncDocs enables users to create, edit, collaborate, and manage documents with offline support, version history, and AI-powered summaries.

---

## 🚀 Features

### 🔐 Authentication

- User Registration
- User Login
- Secure session management with NextAuth
- Protected routes and APIs

### 📄 Document Management

- Create documents
- Rename documents
- Delete documents
- Search documents
- Pagination

### ✍️ Rich Text Editor

- Built with TipTap
- Auto-save
- Version tracking
- Local-first editing

### 📦 Offline First

- Local storage using Dexie.js
- Continue editing while offline
- Automatic synchronization when back online

### 🔄 Sync Engine

- Local queue for offline operations
- Background synchronization
- Connection status indicator

### 👥 Collaboration

- Share documents
- Add collaborators
- Update collaborator roles
- Remove collaborators

### 🕒 Version History

- Automatic document versioning
- View previous versions
- Restore any version

### 🤖 AI Features

- AI-powered document summaries
- Copy summary to clipboard
- Loading skeletons

### 🎨 User Experience

- Responsive UI
- Loading skeletons
- Empty states
- Modern dashboard
- Navbar & Footer

---

# 🛠 Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- React Query
- TipTap Editor
- React Hook Form
- Zod
- Lucide Icons

## Backend

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL
- NextAuth

## Local Storage

- Dexie.js

## AI

- Google Gemini API

---

# 📂 Project Structure

```
src
│
├── app
│   ├── (auth)
│   ├── (dashboard)
│   └── api
│
├── components
│   ├── ai
│   ├── auth
│   ├── collaboration
│   ├── common
│   ├── dashboard
│   ├── editor
│   ├── layout
│   ├── sync
│   └── ui
│
├── hooks
├── lib
├── providers
├── services
├── types
├── validations
└── prisma
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/P-ayush/collaborative-document-editor.git
```

Go into the project

```bash
cd syncdocs
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DATABASE_URL=

NEXTAUTH_SECRET=

NEXTAUTH_URL=

GEMINI_API_KEY=
```

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Start the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🧪 Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production server.

```bash
npm run lint
```

Runs ESLint.

---

# 🔄 CI/CD

This project uses **GitHub Actions** for Continuous Integration.

On every push or pull request to the `main` branch, the workflow automatically:

- Installs dependencies
- Generates Prisma Client
- Runs ESLint
- Builds the project

Deployment is handled automatically by **Vercel**.

---

# 🌐 Deployment

The application is deployed on **Vercel**.

Production Environment Variables:

```env
DATABASE_URL=

NEXTAUTH_SECRET=

NEXTAUTH_URL=

GEMINI_API_KEY=
```

---

# 🏗 Architecture

```
                User
                  │
                  ▼
          Next.js Frontend
                  │
       ┌──────────┴──────────┐
       ▼                     ▼
 React Query            Dexie (Offline)
       │                     │
       └──────────┬──────────┘
                  ▼
            API Routes
                  │
          Prisma ORM
                  │
             PostgreSQL

                  │
             Gemini API
```

# 👨‍💻 Author

**Ayush Prasad**

GitHub: https://github.com/P-ayush

LinkedIn: https://www.linkedin.com/in/ayush-prasad-51811222b/

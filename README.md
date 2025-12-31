# Nexto2 Monorepo

This project contains three parts:

- frontend: Next.js app for users
- backend: Express API server
- admin: Next.js admin dashboard

## Prerequisites
- Node.js 18+
- MongoDB running locally or in the cloud

## Quick Start

### Backend
```
cd backend
npm install
npm run dev
```
Server runs at http://localhost:4000

### Frontend
```
cd frontend
npm install
npm run dev
```
App runs at http://localhost:3000

### Admin
```
cd admin
npm install
npm run dev
```
Admin runs at http://localhost:3001

## Environment
Use the root `.env` for local variables. Backend also has `backend/.env` for server-only secrets.

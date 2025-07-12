# 🏺 Historical Artifacts Tracker

A full-stack web application for discovering, liking, and managing historical artifacts from around the world.

## 🌐 Live Website

👉 [View Live](https://artifacts-tracker-472eb.web.app)

## 📌 Purpose

The goal of this application is to provide users with a platform to:
- Browse historical artifacts with images and context.
- Like and save artifacts to their personal collection.
- Add, update, or delete artifacts they’ve discovered.
- Explore and search for artifacts by name.
- View artifacts with the most likes.

## 🚀 Key Features

- 🔍 **Search Artifacts**: Filter artifacts by name.
- ❤️ **Like Artifacts**: Save favorites to personal collection.
- 🧑‍💼 **Private Routes**: Secure access to “My Artifacts”, “Liked Artifacts” pages.
- ✏️ **Add/Update/Delete Artifacts**: Easily manage user-submitted entries.
- 🎨 **Responsive UI**: Clean and elegant design with animations.

## 🔐 Authentication

- Firebase Authentication (email/password)
- HTTP-only JWT token used for secure route access

## 📦 Technologies Used

### Frontend
- **React 19**
- **React Router v7**
- **Tailwind CSS v4**
- **DaisyUI** — for pre-styled UI components
- **Framer Motion** — for smooth animations
- **SweetAlert2** — for elegant pop-up dialogs
- **SwiperJS** — for carousel effects
- **React Icons** — for modern icons

### Backend
- **Express.js**
- **MongoDB**
- **Firebase Admin SDK** — for verifying JWT access tokens
- **JWT** — for secure user sessions

## 📁 NPM Packages Used

```json
"dependencies": {
  "@tailwindcss/vite": "^4.1.11",
  "daisyui": "^5.0.46",
  "firebase": "^11.10.0",
  "framer-motion": "^12.23.3",
  "gsap": "^3.13.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-icons": "^5.5.0",
  "react-router": "^7.6.3",
  "sweetalert2": "^11.22.2",
  "swiper": "^11.2.10",
  "tailwindcss": "^4.1.11"
}

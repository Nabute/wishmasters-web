# 🏆 Competition Frontend (Nuxt.js)

A simple Nuxt.js app for user authentication, competition management, and leaderboards.

## 🚀 Features
- **Login & Signup**  
- **View Competitions**  
- **Join Competitions**  
- **Submit Scores**  
- **View Leaderboard**  

## 🛠️ Tech Stack
- **Nuxt.js** (Vue.js framework)  
- **Pinia** (State management)  
- **ofetch** (API requests, using factory design pattern)  
- **Vuetify** (UI style and components)  

## 📦 Setup

1️⃣ Clone the repository:  
```sh
git clone git@github.com:Nabute/wishmasters-web.git
cd wishmasters-web
```

2️⃣ Install dependencies:  
```sh
pnpm install
```

3️⃣ Set up environment variables:  
Create a `.env` file and add:  
```env
SITE_NAME = Wishmasters – Compete. Win. Rise. 🏆
BASE_URL = http://localhost:8000/api/v1
```

4️⃣ Start the development server:  
```sh
pnpm dev
```
The app runs on `http://localhost:3000`.

## 🚀 Build & Deploy
For static hosting:  
```sh
pnpm generate
```

## 📌 Notes
- Ensure the backend is running.  
- Update `.env` with the correct API URL.
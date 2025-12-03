# FitMaster Deployment Guide

## Overview
This guide covers deploying FitMaster to production. The frontend will be deployed to Vercel, and the backend can be deployed to services like Render, Railway, or Heroku.

## Prerequisites
- GitHub account
- Vercel account
- MongoDB Atlas account (for production database)
- API keys for Gemini, ExerciseDB, Spoonacular, YouTube

---

## Part 1: Backend Deployment

### Option A: Deploy to Render (Recommended)

1. **Create a Render account** at [render.com](https://render.com)

2. **Push your code to GitHub**:
   ```bash
   cd server
   git add .
   git commit -m "Prepare backend for deployment"
   git push
   ```

3. **Create a new Web Service on Render**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `server` directory
   - Configure:
     - **Name**: `fitmaster-api`
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`
     - **Plan**: Free

4. **Add Environment Variables** in Render dashboard:
   ```
   PORT=5000
   MONGO_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-a-secure-random-string>
   GEMINI_API_KEY=<your-gemini-api-key>
   EXERCISE_DB_API_KEY=<your-exercisedb-key>
   SPOONACULAR_API_KEY=<your-spoonacular-key>
   YOUTUBE_API_KEY=<your-youtube-key>
   EMAIL_USER=<your-email>
   EMAIL_PASS=<your-email-password>
   ```

5. **Deploy** and copy your backend URL (e.g., `https://fitmaster-api.onrender.com`)

### Option B: Deploy to Railway

1. Visit [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Select `server` directory
4. Add environment variables
5. Deploy

---

## Part 2: MongoDB Atlas Setup

1. **Create MongoDB Atlas account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a new cluster**:
   - Choose FREE tier (M0)
   - Select a region close to your backend

3. **Create Database User**:
   - Database Access → Add New Database User
   - Set username and password
   - Save credentials

4. **Whitelist IP Addresses**:
   - Network Access → Add IP Address
   - Allow access from anywhere: `0.0.0.0/0` (for development)

5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Use this as `MONGO_URI` in backend environment variables

---

## Part 3: Frontend Deployment to Vercel

1. **Update API URL**:
   - The `api.ts` file is already configured to use environment variables

2. **Push to GitHub**:
   ```bash
   cd client
   git add .
   git commit -m "Prepare frontend for deployment"
   git push
   ```

3. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Next.js
     - **Root Directory**: `client`
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`

4. **Add Environment Variable**:
   - In Vercel project settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.onrender.com/api`
   - Replace with your actual backend URL from Part 1

5. **Deploy** and get your frontend URL

---

## Part 4: Final Configuration

### Update CORS in Backend

Edit `server/server.js` to allow your Vercel domain:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-vercel-app.vercel.app'],
  credentials: true
}));
```

Redeploy the backend after this change.

### Test Your Deployment

1. Visit your Vercel URL
2. Register a new account
3. Complete onboarding
4. Test workout and meal generation
5. Log weight and check progress

---

## Troubleshooting

### Backend Issues
- **500 errors**: Check MongoDB connection string
- **CORS errors**: Verify frontend URL is in CORS whitelist
- **API errors**: Check environment variables are set correctly

### Frontend Issues
- **API connection failed**: Verify `NEXT_PUBLIC_API_URL` is correct
- **Build errors**: Check all dependencies are installed
- **Runtime errors**: Check browser console for details

---

## Environment Variables Summary

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-key
EXERCISE_DB_API_KEY=your-key
SPOONACULAR_API_KEY=your-key
YOUTUBE_API_KEY=your-key
EMAIL_USER=your-email
EMAIL_PASS=your-password
```

### Frontend (Vercel Environment Variables)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

---

## Quick Deploy Commands

```bash
# Backend (from FitMaster root)
cd server
git add .
git commit -m "Deploy backend"
git push

# Frontend (from FitMaster root)
cd client
git add .
git commit -m "Deploy frontend"
git push
```

Vercel will auto-deploy on push if connected to GitHub.

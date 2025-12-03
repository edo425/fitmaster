# 🚀 Quick Deployment Checklist

## Prerequisites (One-time setup)
- [ ] Create GitHub account (if you don't have one)
- [ ] Create Vercel account at vercel.com
- [ ] Create Render account at render.com
- [ ] Create MongoDB Atlas account at mongodb.com/cloud/atlas
- [ ] Get Gemini API key from ai.google.dev

## Step 1: Push to GitHub (5 minutes)
```bash
# Run these commands in the FitMaster directory:
git add .
git commit -m "Initial commit"
git branch -M main

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/fitmaster.git
git push -u origin main
```

## Step 2: Deploy Backend to Render (10 minutes)
1. Go to render.com → New → Web Service
2. Connect your GitHub repository
3. Settings:
   - Name: `fitmaster-api`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. Add Environment Variables (click "Add Environment Variable"):
   ```
   MONGO_URI = (get from MongoDB Atlas)
   JWT_SECRET = (any random string, e.g., "mySecretKey123")
   GEMINI_API_KEY = (get from ai.google.dev)
   ```
5. Click "Create Web Service"
6. **Copy the URL** (e.g., https://fitmaster-api.onrender.com)

## Step 3: Deploy Frontend to Vercel (5 minutes)
1. Go to vercel.com → Add New Project
2. Import your GitHub repository
3. Settings:
   - Framework: Next.js
   - Root Directory: `client`
4. Add Environment Variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://YOUR-RENDER-URL.onrender.com/api`
5. Click "Deploy"

## Step 4: Setup MongoDB Atlas (10 minutes)
1. Go to mongodb.com/cloud/atlas
2. Create free cluster (M0)
3. Create database user (save username/password)
4. Network Access → Add IP → Allow from anywhere (0.0.0.0/0)
5. Connect → Connect your application → Copy connection string
6. Go back to Render → Add MONGO_URI environment variable with this string
7. Replace `<password>` in the string with your actual password

## Done! 🎉
Your app should be live at your Vercel URL!

## Troubleshooting
- Backend not working? Check Render logs
- Frontend not connecting? Verify NEXT_PUBLIC_API_URL is correct
- Database errors? Check MongoDB Atlas connection string

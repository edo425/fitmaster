# 🚀 Deploy FitMaster to Vercel - Step by Step

## Your GitHub Repository
✅ Code is now at: https://github.com/edo425/fitmaster

---

## Step 1: Deploy Frontend to Vercel (5 minutes)

### 1.1 Go to Vercel
Visit: https://vercel.com/login

Click **"Continue with GitHub"**

### 1.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Find **"edo425/fitmaster"** in the list
3. Click **"Import"**

### 1.3 Configure Project
**IMPORTANT Settings:**

- **Framework Preset**: Next.js (should auto-detect)
- **Root Directory**: Click **"Edit"** → Type: `client`
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 1.4 Add Environment Variable
Click **"Environment Variables"**

Add this variable:
- **Name**: `NEXT_PUBLIC_API_URL`
- **Value**: `http://localhost:5000/api` (we'll update this after backend deployment)

### 1.5 Deploy!
Click **"Deploy"**

Wait 2-3 minutes. You'll get a URL like:
`https://fitmaster-xxx.vercel.app`

**Save this URL!** ✅

---

## Step 2: Deploy Backend to Render (10 minutes)

### 2.1 Go to Render
Visit: https://render.com/

Click **"Get Started"** → Sign up with GitHub

### 2.2 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Click **"Build and deploy from a Git repository"**
3. Click **"Next"**
4. Find **"edo425/fitmaster"** → Click **"Connect"**

### 2.3 Configure Service
**Settings:**

- **Name**: `fitmaster-api`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Instance Type**: Free

### 2.4 Add Environment Variables
Scroll down to **"Environment Variables"**

Click **"Add Environment Variable"** for each:

```
PORT = 5000
JWT_SECRET = fitmaster_secret_key_2024
GEMINI_API_KEY = (your Gemini API key - get from ai.google.dev)
MONGO_URI = (we'll add this in Step 3)
```

**Don't deploy yet!** We need MongoDB first.

---

## Step 3: Setup MongoDB Atlas (10 minutes)

### 3.1 Create Account
Visit: https://www.mongodb.com/cloud/atlas/register

Sign up (free)

### 3.2 Create Cluster
1. Choose **"M0 FREE"** tier
2. Choose a cloud provider (AWS recommended)
3. Choose region closest to your Render backend
4. Cluster Name: `FitMaster`
5. Click **"Create Deployment"**

### 3.3 Create Database User
A popup will appear:

- **Username**: `fitmaster`
- **Password**: Click **"Autogenerate Secure Password"** → **Copy it!**
- Click **"Create Database User"**

### 3.4 Add IP Whitelist
- Click **"Add My Current IP Address"**
- Also add: `0.0.0.0/0` (allows from anywhere - for Render)
- Click **"Finish and Close"**

### 3.5 Get Connection String
1. Click **"Connect"**
2. Click **"Drivers"**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://fitmaster:<password>@fitmaster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with the password you copied earlier
5. Add database name before `?`: 
   ```
   mongodb+srv://fitmaster:YOUR_PASSWORD@fitmaster.xxxxx.mongodb.net/fitmaster?retryWrites=true&w=majority
   ```

### 3.6 Add to Render
Go back to Render → Environment Variables

Add:
```
MONGO_URI = (paste your connection string here)
```

Click **"Create Web Service"**

Wait 5 minutes for deployment. You'll get a URL like:
`https://fitmaster-api.onrender.com`

**Save this URL!** ✅

---

## Step 4: Update Frontend API URL

### 4.1 Update Vercel Environment Variable
1. Go to your Vercel dashboard
2. Click on your **"fitmaster"** project
3. Go to **"Settings"** → **"Environment Variables"**
4. Find `NEXT_PUBLIC_API_URL`
5. Click **"Edit"**
6. Change value to: `https://YOUR-RENDER-URL.onrender.com/api`
   (Replace with your actual Render URL)
7. Click **"Save"**

### 4.2 Redeploy Frontend
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait 2 minutes

---

## 🎉 YOU'RE DONE!

Your app is live at:
- **Frontend**: https://fitmaster-xxx.vercel.app
- **Backend**: https://fitmaster-api.onrender.com

### Test It:
1. Visit your Vercel URL
2. Click **"Register"**
3. Create an account
4. Complete onboarding
5. Check your AI workout plan!

---

## Troubleshooting

### Frontend shows "Network Error"
- Check that `NEXT_PUBLIC_API_URL` in Vercel matches your Render URL
- Make sure it ends with `/api`

### Backend shows errors
- Check Render logs: Dashboard → Your Service → Logs
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### Can't register users
- Check MongoDB Atlas → Network Access → IP Whitelist includes `0.0.0.0/0`
- Verify database user was created correctly

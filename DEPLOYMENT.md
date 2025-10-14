# 🚀 Deployment Guide

## Overview
Your CI/CD pipeline now includes deployment steps! Here's how to set up actual deployment to cloud platforms.

## 🎯 Deployment Options

### Option 1: Render (Recommended - Free Tier Available)
1. **Sign up at [render.com](https://render.com)**
2. **Create two services:**
   - **Backend Service:**
     - Connect your GitHub repository
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Environment Variables:
       - `MONGO_URI`: Your MongoDB Atlas connection string
       - `JWT_SECRET`: Your production JWT secret
       - `PORT`: 8000

   - **Frontend Service:**
     - Connect your GitHub repository
     - Root Directory: `frontend`
     - Build Command: `npm install && npm run build`
     - Static Publish Directory: `dist`
     - Environment Variables:
       - `VITE_API_URL`: Your backend service URL

### Option 2: Railway
1. **Sign up at [railway.app](https://railway.app)**
2. **Deploy from GitHub:**
   - Connect your repository
   - Railway will auto-detect your services
   - Set environment variables in Railway dashboard

### Option 3: Vercel (Frontend) + Railway (Backend)
1. **Frontend on Vercel:**
   - Connect GitHub repository
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

2. **Backend on Railway:**
   - Connect GitHub repository
   - Root Directory: `backend`
   - Start Command: `npm start`

## 🔧 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your-super-secret-jwt-key
PORT=8000
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.onrender.com
```

## 🚀 Automated Deployment

Your GitHub Actions workflow will now:
1. ✅ **Build and test** your application
2. ✅ **Deploy automatically** when you push to main
3. ✅ **Update environment variables**
4. ✅ **Notify you of deployment status**

## 📱 Testing Your Deployment

After deployment:
1. **Check your backend:** `https://your-backend.onrender.com/health`
2. **Check your frontend:** `https://your-frontend.onrender.com`
3. **Test the full flow:** Register → Login → Browse products → Add to cart

## 🔄 Manual Deployment

If you need to deploy manually:
```bash
# Deploy using your script
./scripts/deploy.sh "Deploy to production"

# Or use npm
npm run deploy "Deploy to production"
```

## 🐛 Troubleshooting

### Common Issues:
1. **Build fails:** Check your `package.json` scripts
2. **Environment variables:** Ensure they're set in your cloud platform
3. **Database connection:** Verify your MongoDB Atlas connection string
4. **CORS issues:** Update your backend CORS settings for production URLs

### Debug Commands:
```bash
# Check build locally
cd frontend && npm run build
cd backend && npm start

# Test Docker builds
docker build -t ecommerce-backend ./backend
docker build -t ecommerce-frontend ./frontend
```

## 🎉 Success!

Once deployed, your e-commerce app will be live and accessible to users worldwide! 🌍

---

**Need help?** Check the logs in your cloud platform dashboard or GitHub Actions.
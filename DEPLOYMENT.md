# 🚀 Render Deployment Guide

This guide will help you deploy your e-commerce application to Render.

## 📋 Prerequisites

1. **GitHub Repository**: Your code must be pushed to GitHub
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Atlas**: Set up a cloud database

## 🗄️ Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Whitelist your IP (or use 0.0.0.0/0 for all IPs)

## 🔧 Backend Deployment

### Step 1: Create Backend Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

**Basic Settings:**
- **Name**: `ecommerce-backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`

**Build & Deploy:**
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Root Directory**: Leave empty

**Environment Variables:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
PORT=8000
NODE_ENV=production
```

### Step 2: Deploy Backend
1. Click **"Create Web Service"**
2. Wait for deployment to complete
3. Note the backend URL (e.g., `https://ecommerce-backend.onrender.com`)

## 🎨 Frontend Deployment

### Step 1: Create Frontend Service
1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure the service:

**Basic Settings:**
- **Name**: `ecommerce-frontend`
- **Environment**: `Static Site`
- **Branch**: `main`

**Build & Deploy:**
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/dist`

**Environment Variables:**
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Step 2: Deploy Frontend
1. Click **"Create Static Site"**
2. Wait for deployment to complete
3. Note the frontend URL (e.g., `https://ecommerce-frontend.onrender.com`)

## 🔄 Update Backend CORS

After getting your frontend URL, update the backend CORS settings:

1. Go to your backend service on Render
2. Add environment variable:
```
FRONTEND_URL=https://your-frontend-url.onrender.com
```

3. Update your backend code to use this environment variable in CORS configuration.

## 🧪 Testing Deployment

### Backend Health Check
```bash
curl https://your-backend-url.onrender.com/health
```

### Frontend Access
Visit your frontend URL and test:
- User registration/login
- Product browsing
- Search functionality
- Cart operations
- Order placement

## 🔧 Environment Variables Reference

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
PORT=8000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.onrender.com
```

### Frontend
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## 🚨 Common Issues & Solutions

### 1. Backend Crashes
- Check MongoDB connection string
- Verify all environment variables
- Check Render logs for errors

### 2. Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is correct
- Check CORS configuration
- Ensure backend is running

### 3. Database Connection Issues
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has proper permissions

### 4. Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check for missing environment variables

## 📊 Monitoring

### Render Dashboard
- Monitor service health
- Check deployment logs
- View performance metrics

### Application Logs
- Backend: Available in Render dashboard
- Frontend: Check browser console
- Database: MongoDB Atlas logs

## 🔄 Updates & Maintenance

### Deploying Updates
1. Push changes to GitHub
2. Render automatically redeploys
3. Monitor deployment status
4. Test functionality after deployment

### Database Maintenance
- Regular backups via MongoDB Atlas
- Monitor database performance
- Scale as needed

## 💰 Cost Optimization

### Free Tier Limits
- **Backend**: 750 hours/month
- **Frontend**: Unlimited static hosting
- **Database**: 512MB storage

### Scaling Considerations
- Upgrade to paid plans for production
- Use CDN for static assets
- Implement caching strategies

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Database connection working
- [ ] CORS properly configured
- [ ] SSL certificates active
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Performance optimized
- [ ] Security measures in place

---

**Your e-commerce app is now live and ready for customers! 🎉**

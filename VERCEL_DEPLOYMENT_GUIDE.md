# Vercel Deployment Guide for Skillence Website

## ✅ Pre-Deployment Checklist

### 1. **Environment Variables Required**
Make sure you have these set in Vercel:
- `GAS_WEB_APP_URL` - Your Google Apps Script Web App URL
- `ADMIN_USERNAME` - Admin panel username
- `ADMIN_PASSWORD` - Admin panel password
- `PING_MESSAGE` (optional) - Default: "ping"

### 2. **Google Apps Script Setup**
- ✅ `doPost` function deployed for form submissions
- ✅ `doGet` function deployed for admin panel
- ✅ Web App deployed with "Anyone" access
- ✅ Web App URL copied and ready

### 3. **Code Ready**
- ✅ All files committed to GitHub
- ✅ `.env` file is in `.gitignore` (won't be deployed)
- ✅ Logo and assets in place

---

## 🚀 Deployment Steps

### Step 1: Install Vercel CLI (Optional)
```bash
npm i -g vercel
```

### Step 2: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "Add New Project"**
3. **Import your GitHub repository:**
   - Select `Scientist-Py/SKILLENCE`
   - Click "Import"

4. **Configure Project:**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build:client`
   - **Output Directory**: `dist/spa`
   - **Install Command**: `npm install` (or `pnpm install`)

5. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   GAS_WEB_APP_URL = your_google_apps_script_url_here
   ADMIN_USERNAME = your_admin_username
   ADMIN_PASSWORD = your_admin_password
   PING_MESSAGE = ping
   ```

6. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

### Step 3: Configure API Routes

Since Vercel uses serverless functions, you have two options:

#### Option A: Use Vercel Serverless Functions (Recommended)
The `api/index.ts` file I created will handle this automatically.

#### Option B: Use External API (Alternative)
If serverless functions don't work, you can:
1. Deploy your Express server separately (Railway, Render, etc.)
2. Update API calls to use the external URL

---

## ⚙️ Post-Deployment Configuration

### 1. **Update CORS Settings**
If you get CORS errors, update `server/index.ts`:
```typescript
app.use(cors({
  origin: ['https://your-vercel-app.vercel.app', 'http://localhost:8080'],
  credentials: true
}));
```

### 2. **Test Your Deployment**

#### Test Form Submission:
1. Go to your deployed site
2. Fill out the registration form
3. Check Google Sheets - data should appear

#### Test Admin Panel:
1. Go to `https://your-app.vercel.app/admin/login`
2. Login with your credentials
3. Check dashboard and analytics

#### Test API Endpoints:
- `https://your-app.vercel.app/api/ping` - Should return `{"message":"ping"}`
- `https://your-app.vercel.app/api/debug/env` - Check env vars (remove in production)

---

## 🔧 Troubleshooting

### Issue 1: API Routes Not Working
**Solution**: 
- Check `vercel.json` configuration
- Ensure API routes are in `api/` folder
- Check Vercel function logs

### Issue 2: Environment Variables Not Loading
**Solution**:
- Go to Vercel Dashboard → Settings → Environment Variables
- Make sure variables are added for "Production"
- Redeploy after adding variables

### Issue 3: Google Sheets Not Working
**Solution**:
- Verify `GAS_WEB_APP_URL` is correct in Vercel
- Test Google Apps Script URL directly in browser
- Check Google Apps Script execution logs

### Issue 4: Admin Panel Not Working
**Solution**:
- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set
- Check Vercel function logs for errors
- Test `/api/debug/env` endpoint

### Issue 5: Build Fails
**Solution**:
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Try using `npm` instead of `pnpm` in build settings

---

## 📝 Important Notes

### ✅ What Will Work:
- ✅ Frontend (React app)
- ✅ Form submissions to Google Sheets
- ✅ Admin panel login
- ✅ Dashboard and analytics
- ✅ All static assets (logo, images)

### ⚠️ What Needs Configuration:
- ⚠️ API routes (may need serverless function setup)
- ⚠️ Environment variables (must be set in Vercel)
- ⚠️ CORS (may need adjustment for your domain)

### 🔒 Security:
- ✅ `.env` file is NOT deployed (safe)
- ✅ Passwords are in Vercel environment variables (secure)
- ⚠️ Remove `/api/debug/env` endpoint in production

---

## 🎯 Quick Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Environment variables added in Vercel
- [ ] Build settings configured
- [ ] Deployed successfully
- [ ] Form submission tested
- [ ] Admin panel tested
- [ ] Google Sheets integration verified

---

## 📞 Need Help?

If something doesn't work:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Test API endpoints directly
4. Verify environment variables are set
5. Check Google Apps Script is deployed correctly

---

**Your website should work perfectly on Vercel!** 🚀

The main things to ensure:
1. ✅ Environment variables are set in Vercel dashboard
2. ✅ Google Apps Script is properly deployed
3. ✅ API routes are configured correctly

Everything else should work automatically! 🎉


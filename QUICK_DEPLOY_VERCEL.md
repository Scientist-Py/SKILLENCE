# Quick Deploy to Vercel - Step by Step

## ✅ What's Ready

- ✅ `vercel.json` configuration file
- ✅ API serverless functions in `api/` directory
- ✅ Form submission endpoint: `api/submit-form.ts`
- ✅ Admin endpoints: `api/admin/login.ts`, `api/admin/submissions.ts`, `api/admin/stats.ts`
- ✅ Build configuration ready

---

## 🚀 Deploy in 5 Minutes

### Step 1: Push to GitHub (if not already done)

```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push
```

### Step 2: Deploy to Vercel

**Option A: Via Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `Scientist-Py/SKILLENCE`
4. Vercel will auto-detect settings:
   - **Framework**: Other
   - **Build Command**: `npm run build:client`
   - **Output Directory**: `dist/spa`
5. Click **"Deploy"**

**Option B: Via CLI**

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Step 3: Add Environment Variables (CRITICAL!)

**In Vercel Dashboard:**

1. Go to your project → **Settings** → **Environment Variables**
2. Add these variables:

```
GAS_WEB_APP_URL=your_google_apps_script_url_here
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
PING_MESSAGE=ping
```

3. **Important**: Add them for **Production**, **Preview**, and **Development**
4. Click **Save** after each one
5. **Redeploy** after adding environment variables

### Step 4: Test Your Deployment

1. **Test Form Submission**:
   - Go to your Vercel URL
   - Fill out the form
   - Submit
   - Check Google Sheets - data should appear

2. **Test Admin Panel**:
   - Go to `https://your-url.vercel.app/admin/login`
   - Login with your credentials
   - Check dashboard and analytics

---

## 📋 Environment Variables Checklist

Make sure these are set in Vercel:

- [ ] `GAS_WEB_APP_URL` - Your Google Apps Script Web App URL
- [ ] `ADMIN_USERNAME` - Your admin username
- [ ] `ADMIN_PASSWORD` - Your admin password
- [ ] `PING_MESSAGE` - Optional (defaults to "ping")

---

## 🔧 API Routes

Your API routes will be available at:

- `POST /api/submit-form` - Form submission
- `POST /api/admin/login` - Admin login
- `GET /api/admin/submissions` - Get all submissions
- `GET /api/admin/stats` - Get dashboard statistics

---

## ✅ Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] Form submission works (data appears in Google Sheets)
- [ ] Admin login works
- [ ] Admin dashboard shows data
- [ ] Admin analytics shows charts
- [ ] All API routes respond correctly

---

## 🐛 Troubleshooting

### Form doesn't submit
- Check `GAS_WEB_APP_URL` is set correctly
- Check Vercel function logs for errors
- Verify Google Apps Script is deployed

### Admin login doesn't work
- Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set
- Check values match what you're using
- Redeploy after adding environment variables

### API routes return 404
- Check files are in `api/` directory
- Check file names match route paths
- Verify `vercel.json` is in root directory

---

## 📝 Quick Commands

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Check environment variables
vercel env ls
```

---

**Your website is ready to deploy!** 🚀

Just follow the steps above and your website will be live on Vercel with all features working!


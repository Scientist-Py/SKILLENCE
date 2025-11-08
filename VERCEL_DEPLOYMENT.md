# Deploy to Vercel - Complete Guide

## ✅ Pre-Deployment Checklist

- [x] Vercel configuration created (`vercel.json`)
- [x] API serverless functions created in `api/` directory
- [x] Build configuration ready
- [ ] Environment variables configured (do this in Vercel dashboard)

---

## 🚀 Step 1: Install Vercel CLI (Optional but Recommended)

```bash
npm install -g vercel
```

Or use the web interface (easier for first-time deployment).

---

## 🚀 Step 2: Deploy via Vercel Dashboard (Easiest Method)

### 2.1: Connect Your GitHub Repository

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `Scientist-Py/SKILLENCE`
4. Vercel will auto-detect the project settings

### 2.2: Configure Build Settings

Vercel should auto-detect, but verify:
- **Framework Preset**: Other (or Vite)
- **Build Command**: `npm run build:client`
- **Output Directory**: `dist/spa`
- **Install Command**: `npm install` (or `pnpm install` if you prefer)

### 2.3: Add Environment Variables

**CRITICAL**: Add these environment variables in Vercel dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Add each variable:

```
GAS_WEB_APP_URL=your_google_apps_script_url_here
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
PING_MESSAGE=ping
```

**Important**: 
- Add them for **Production**, **Preview**, and **Development** environments
- Click **Save** after adding each one

### 2.4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (2-3 minutes)
3. Your site will be live at: `https://your-project-name.vercel.app`

---

## 🚀 Step 3: Deploy via CLI (Alternative Method)

### 3.1: Login to Vercel

```bash
vercel login
```

### 3.2: Deploy

```bash
# First deployment (will ask questions)
vercel

# Production deployment
vercel --prod
```

### 3.3: Add Environment Variables via CLI

```bash
vercel env add GAS_WEB_APP_URL
vercel env add ADMIN_USERNAME
vercel env add ADMIN_PASSWORD
vercel env add PING_MESSAGE
```

---

## 📁 Project Structure for Vercel

```
SkillEnce-main/
├── api/                    # Vercel serverless functions
│   ├── submit-form.ts      # Form submission endpoint
│   └── admin/
│       ├── login.ts        # Admin login
│       ├── submissions.ts  # Get submissions
│       └── stats.ts        # Get dashboard stats
├── client/                 # React frontend
├── server/                 # Express server code (used by API functions)
├── vercel.json            # Vercel configuration
└── package.json
```

---

## 🔧 How It Works

1. **Frontend**: Built with Vite → Static files in `dist/spa/`
2. **API Routes**: Each file in `api/` becomes a serverless function
   - `/api/submit-form` → `api/submit-form.ts`
   - `/api/admin/login` → `api/admin/login.ts`
   - `/api/admin/submissions` → `api/admin/submissions.ts`
   - `/api/admin/stats` → `api/admin/stats.ts`
3. **Routing**: All non-API routes → `index.html` (SPA routing)

---

## ✅ Post-Deployment Checklist

- [ ] Test form submission: Fill out the form and submit
- [ ] Test admin login: Go to `/admin/login` and login
- [ ] Test admin dashboard: Check if stats load correctly
- [ ] Test admin submissions: Check if submissions list loads
- [ ] Test admin analytics: Check if charts display

---

## 🐛 Troubleshooting

### Issue 1: Form submission fails
- **Check**: Environment variable `GAS_WEB_APP_URL` is set correctly
- **Check**: Google Apps Script is deployed and accessible
- **Check**: Vercel function logs for errors

### Issue 2: Admin login doesn't work
- **Check**: `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set in Vercel
- **Check**: Values match what you're using to login
- **Check**: Environment variables are added to all environments (Production, Preview, Development)

### Issue 3: API routes return 404
- **Check**: Files are in `api/` directory (not `server/`)
- **Check**: File names match the route paths
- **Check**: `vercel.json` is in the root directory

### Issue 4: Build fails
- **Check**: All dependencies are in `package.json`
- **Check**: Build command is correct: `npm run build:client`
- **Check**: Node.js version (Vercel uses Node 20.x by default)

### Issue 5: Environment variables not working
- **Check**: Variables are added in Vercel dashboard (not just `.env` file)
- **Check**: Variables are added to the correct environment
- **Check**: Redeploy after adding environment variables

---

## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `GAS_WEB_APP_URL` | Google Apps Script Web App URL | ✅ Yes |
| `ADMIN_USERNAME` | Admin panel username | ✅ Yes |
| `ADMIN_PASSWORD` | Admin panel password | ✅ Yes |
| `PING_MESSAGE` | Ping endpoint message | ❌ No (optional) |

---

## 🔄 Updating Your Deployment

After making changes:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

2. **Vercel will auto-deploy** (if connected to GitHub)
   - Or manually deploy: `vercel --prod`

3. **If you change environment variables**:
   - Update in Vercel dashboard
   - Redeploy (Vercel will auto-redeploy on next push)

---

## 🌐 Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will handle SSL automatically

---

## 📊 Monitoring

- **Vercel Dashboard**: View deployments, logs, analytics
- **Function Logs**: Check API function execution logs
- **Analytics**: View traffic and performance metrics

---

## ✅ Success Indicators

Your deployment is successful when:
- ✅ Website loads at your Vercel URL
- ✅ Form submission works (data appears in Google Sheets)
- ✅ Admin login works
- ✅ Admin dashboard shows data
- ✅ All API routes respond correctly

---

**Need help?** Check Vercel logs in the dashboard or contact support! 🚀


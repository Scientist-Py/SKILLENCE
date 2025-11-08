# Vercel Deployment Guide

## Problem Fixed

Your website was working locally but failing on Vercel with the error:
> "Server error: Please check if the server is running and API routes are configured correctly."

This happened because Vercel requires a different setup than your local Express server. The changes below configure your app for Vercel's serverless function architecture.

## What Was Changed

1. **Created `vercel.json`** - Configuration file for Vercel deployment
2. **Created `api/index.ts`** - Serverless function handler that wraps your Express server
3. **Updated build configuration** - Vercel now builds only the client (API functions are handled automatically)

## Step-by-Step Deployment Instructions

### Step 1: Push Changes to GitHub

Make sure all the new files are committed and pushed:

```bash
git add vercel.json api/index.ts
git commit -m "Add Vercel serverless function configuration"
git push origin main
```

### Step 2: Configure Environment Variables in Vercel

**CRITICAL:** You must add your environment variables in Vercel's dashboard, otherwise your API routes won't work!

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add the following environment variables:

```
ADMIN_USERNAME=your_username_here
ADMIN_PASSWORD=your_password_here
GAS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
PING_MESSAGE=ping
```

**Important Notes:**
- Replace `your_username_here` and `your_password_here` with your actual admin credentials
- Replace `YOUR_SCRIPT_ID` with your actual Google Apps Script Web App URL
- Make sure to add these for **Production**, **Preview**, and **Development** environments (or at least Production)
- **NO spaces** around the `=` sign
- **NO quotes** around the values

### Step 3: Redeploy Your Project

After adding environment variables:

1. Go to **Deployments** tab in Vercel
2. Click the **⋯** (three dots) menu on your latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic deployment

### Step 4: Verify Deployment

1. Visit your deployed website
2. Try submitting the form
3. Check the **Functions** tab in Vercel dashboard to see if API calls are working
4. Check the **Logs** tab if there are any errors

## File Structure

After these changes, your project structure includes:

```
├── api/
│   └── index.ts          # Vercel serverless function handler
├── vercel.json           # Vercel configuration
├── server/
│   ├── index.ts          # Express server (unchanged)
│   └── routes/           # API routes (unchanged)
└── client/               # React frontend (unchanged)
```

## How It Works

1. **Local Development**: Uses Express server integrated with Vite (unchanged)
2. **Vercel Production**: 
   - Frontend is served as static files from `dist/spa`
   - API routes (`/api/*`) are handled by serverless functions in `api/index.ts`
   - The serverless function wraps your Express server using `serverless-http`

## Troubleshooting

### Issue: "Server error: Please check if the server is running"

**Solution:**
1. ✅ Check that `vercel.json` exists in your project root
2. ✅ Check that `api/index.ts` exists
3. ✅ Verify environment variables are set in Vercel dashboard
4. ✅ Check Vercel deployment logs for errors

### Issue: Form submission still not working

**Solution:**
1. Check Vercel **Functions** tab - you should see `/api/submit-form` being called
2. Check Vercel **Logs** tab for error messages
3. Verify `GAS_WEB_APP_URL` environment variable is set correctly in Vercel
4. Test your Google Apps Script URL directly in a browser

### Issue: Admin panel not working

**Solution:**
1. Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set in Vercel environment variables
2. Check Vercel logs for authentication errors
3. Make sure you're using the same credentials as your local `.env` file

### Issue: Build fails on Vercel

**Solution:**
1. Check build logs in Vercel dashboard
2. Make sure `package.json` has all required dependencies
3. Verify Node.js version compatibility (Vercel uses Node 18+ by default)

## Testing Locally Before Deploying

You can test the serverless function locally using Vercel CLI:

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Run local development server
vercel dev
```

This will simulate Vercel's serverless environment locally.

## Environment Variables Checklist

Before deploying, make sure these are set in Vercel:

- [ ] `ADMIN_USERNAME` - Your admin panel username
- [ ] `ADMIN_PASSWORD` - Your admin panel password
- [ ] `GAS_WEB_APP_URL` - Your Google Apps Script Web App URL
- [ ] `PING_MESSAGE` - (Optional) Custom ping message

## Additional Notes

- The `api/index.ts` file uses `serverless-http` to wrap your Express server
- All your existing API routes will work without any changes
- The frontend code doesn't need any changes - it still calls `/api/*` endpoints
- Vercel automatically handles TypeScript compilation for serverless functions

## Need Help?

If you're still experiencing issues:

1. Check Vercel deployment logs
2. Check Vercel function logs
3. Verify all environment variables are set correctly
4. Test your Google Apps Script URL independently
5. Compare your local `.env` file with Vercel environment variables


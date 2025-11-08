# How to Get Charts Working - Simple Guide

## ❌ You DON'T Need Google Sheets API!

The code is already set up to use your **existing Google Apps Script**. You just need to deploy the `doGet` function.

---

## ✅ Simple 3-Step Solution

### Step 1: Add doGet Function to Your Google Apps Script

1. **Open your Google Sheet**
2. **Go to Extensions → Apps Script**
3. **Check if you have `doGet` function** (scroll to the bottom of your script)
4. **If you DON'T see `doGet`, add it:**

   - Open the file `google-apps-script.js` in your project
   - Copy the `doGet` function (it's at the bottom, starting around line 200)
   - Paste it into your Google Apps Script editor
   - **Click Save** (Ctrl+S or Cmd+S)

### Step 2: Redeploy Your Web App

**This is the most important step!**

1. In Google Apps Script, click **Deploy → Manage deployments**
2. **Click the edit icon** (pencil ✏️) on your existing deployment
3. Click **Deploy** (or **Update**)
4. **Copy the Web App URL** (it should be the same, but copy it anyway)
5. Make sure it's in your `.env` file:
   ```env
   GAS_WEB_APP_URL=your_web_app_url_here
   ```

### Step 3: Test It

1. **Copy your Web App URL** from `.env`
2. **Paste it in your browser** (just open the URL)
3. **You should see JSON** like this:
   ```json
   {"ok":true,"data":[...]}
   ```
4. **If you see HTML or an error**, the deployment didn't work - go back to Step 2

---

## 🎯 What's Happening?

- **Form submissions** use `doPost` function ✅ (this works)
- **Admin panel/charts** use `doGet` function ❌ (needs to be deployed)

When you add `doGet` to your script, you MUST redeploy the Web App for it to work!

---

## 📋 Quick Checklist

- [ ] `doGet` function exists in Google Apps Script
- [ ] Script is saved (Ctrl+S)
- [ ] Web App is redeployed (Deploy → Manage deployments → Edit → Deploy)
- [ ] Web App URL is in `.env` file
- [ ] Server is restarted (`pnpm dev`)
- [ ] URL tested in browser (shows JSON, not HTML)

---

## 🧪 Test Your Setup

### Test 1: Check if doGet exists
- Open Google Apps Script
- Look for `function doGet(e)` at the bottom
- If missing, copy from `google-apps-script.js`

### Test 2: Test the URL
- Copy `GAS_WEB_APP_URL` from `.env`
- Open in browser
- Should show: `{"ok":true,"data":[...]}`
- If shows HTML → deployment issue

### Test 3: Check server logs
- Look at your terminal where `pnpm dev` is running
- If you see "HTML instead of JSON" → doGet not deployed
- If you see data being fetched → it's working!

---

## 🚨 Common Mistakes

1. **Adding doGet but not redeploying** → Won't work!
2. **Using old Web App URL** → Make sure URL in `.env` matches deployed URL
3. **Not saving the script** → Make sure to click Save in Apps Script
4. **"Who has access" set to "Only myself"** → Should be "Anyone"

---

## 💡 No API Keys Needed!

You **DO NOT** need:
- ❌ Google Sheets API key
- ❌ Google Cloud Console setup
- ❌ Service accounts
- ❌ OAuth tokens

You **ONLY** need:
- ✅ Google Apps Script with `doGet` function
- ✅ Web App deployment
- ✅ Web App URL in `.env`

That's it! The same Google Apps Script that saves form data will also read data for charts.

---

## 📞 Still Not Working?

1. **Check browser console** (F12) for errors
2. **Check server terminal** for error messages
3. **Test the URL directly** in browser
4. **Check Google Apps Script execution logs** (View → Executions)

The charts will work as soon as `doGet` is properly deployed! 🎉


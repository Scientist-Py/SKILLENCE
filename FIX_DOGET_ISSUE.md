# Fix: doGet Returning HTML Instead of JSON

## The Problem

When making GET requests to your Google Apps Script Web App, it's returning HTML instead of JSON. This happens because:

1. The `doGet` function might not be deployed
2. The Web App needs to be redeployed after adding `doGet`
3. Google Apps Script might be showing an authorization page

## Solution: Redeploy Your Web App

### Step 1: Verify doGet Function Exists

1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. Make sure you see BOTH functions:
   - `function doPost(e)` - for form submissions
   - `function doGet(e)` - for admin panel (should be at the bottom)

### Step 2: Redeploy the Web App

**CRITICAL**: After adding `doGet`, you MUST create a NEW deployment:

1. In Apps Script, click **Deploy → Manage deployments**
2. **Delete the old deployment** (click the trash icon)
3. Click **New deployment**
4. Click the gear icon ⚙️ → Select **Web app**
5. Configure:
   - **Description**: `Form Handler with Admin API`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` (IMPORTANT!)
6. Click **Deploy**
7. **Authorize** if prompted
8. **Copy the NEW Web App URL**

### Step 3: Update .env File

1. Open your `.env` file
2. Update the URL:
   ```env
   GAS_WEB_APP_URL=your_new_web_app_url_here
   ```
3. Make sure the URL ends with `/exec`

### Step 4: Test the URL

1. Copy your Web App URL
2. Paste it in your browser
3. You should see JSON like:
   ```json
   {"ok":true,"data":[...]}
   ```
4. If you see HTML or an error, the deployment isn't working

### Step 5: Restart Server

```bash
# Stop server (Ctrl+C)
pnpm dev
```

## Alternative: Test doGet Directly

You can test the `doGet` function in Apps Script:

1. In Apps Script, select `doGet` from the function dropdown
2. Click **Run** (▶️)
3. Check **View → Execution log** to see if it works
4. If it works here but not from your server, it's a deployment issue

## Why This Happens

- Google Apps Script Web Apps need to be redeployed when you add new functions
- The old deployment only knows about `doPost`
- When you make a GET request, it doesn't find `doGet` and returns an HTML error page

## Quick Checklist

- [ ] `doGet` function exists in your script
- [ ] Script is saved (Ctrl+S)
- [ ] Old deployment is deleted
- [ ] New deployment is created
- [ ] "Who has access" is set to "Anyone"
- [ ] New Web App URL is copied
- [ ] `.env` file is updated
- [ ] Server is restarted
- [ ] URL tested in browser (shows JSON)

## Still Not Working?

1. **Check Execution Logs**:
   - In Apps Script: **View → Executions**
   - Look for errors in `doGet`

2. **Check URL Format**:
   - Should be: `https://script.google.com/macros/s/.../exec`
   - NOT: `https://docs.google.com/spreadsheets/...`

3. **Try Manual Test**:
   - Open URL in browser
   - Should show JSON, not HTML
   - If HTML, deployment is wrong

4. **Check Permissions**:
   - Make sure "Who has access" is "Anyone"
   - Not "Only myself"


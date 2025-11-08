# Fix: Google Apps Script Returning HTML Instead of JSON

If you're seeing the error: `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`, it means Google Apps Script is returning an HTML error page instead of JSON.

## Solution Steps

### Step 1: Make sure doGet function is in your script

1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. Make sure you have BOTH functions:
   - `doPost(e)` - for form submissions
   - `doGet(e)` - for reading data (admin panel)

### Step 2: Redeploy your Web App

**IMPORTANT**: After adding `doGet`, you MUST redeploy:

1. In Apps Script, click **Deploy → Manage deployments**
2. Click the **edit icon** (pencil) on your existing deployment
3. Click **Deploy** (or **Update**)
4. **Copy the NEW Web App URL** (it might be the same, but make sure)
5. Update your `.env` file with the URL:
   ```env
   GAS_WEB_APP_URL=your_new_web_app_url_here
   ```

### Step 3: Check Web App Settings

Make sure your Web App deployment has:
- **Execute as**: Me
- **Who has access**: Anyone (or "Anyone with the link")
- **Both GET and POST requests should work**

### Step 4: Test the doGet function directly

1. Copy your Web App URL
2. Open it in a browser (just paste the URL)
3. You should see JSON like:
   ```json
   {"ok":true,"data":[...]}
   ```
4. If you see HTML or an error page, the deployment isn't working

### Step 5: Restart your server

After updating `.env`:
```bash
# Stop server (Ctrl+C)
pnpm dev
```

## Common Issues

### Issue 1: "Authorization required"
- **Fix**: Make sure "Who has access" is set to "Anyone" in Web App deployment

### Issue 2: "Script function not found"
- **Fix**: Make sure `doGet` function exists in your script and is saved

### Issue 3: Still getting HTML
- **Fix**: 
  1. Delete the old deployment
  2. Create a NEW deployment
  3. Make sure both doPost and doGet are in the script
  4. Deploy as Web App
  5. Copy the new URL

### Issue 4: doGet works in browser but not from server
- **Fix**: Check CORS settings (should work with "Anyone" access)
- Make sure the URL in `.env` is correct (no extra characters)

## Quick Test

Test your Google Apps Script URL directly:

```bash
# In browser, just paste your GAS_WEB_APP_URL
# Should show JSON, not HTML
```

Or test with curl:
```bash
curl "YOUR_GAS_WEB_APP_URL"
```

Should return JSON, not HTML!

## Still Not Working?

1. Check Google Apps Script execution logs:
   - In Apps Script: **View → Executions**
   - Look for errors in doGet function

2. Check server terminal:
   - Look for the error message
   - It will show what HTML was returned

3. Verify your script has both functions:
   - `doPost` - for form submissions
   - `doGet` - for admin panel data


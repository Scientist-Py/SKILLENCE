# Google Sheets Integration Setup Guide

This guide will help you set up Google Apps Script to automatically save form submissions from your website to Google Sheets.

## Architecture Overview

Your website form → Express Server (`/api/submit-form`) → Google Apps Script → Google Sheets

This setup provides:
- ✅ Automatic column header creation
- ✅ Proper error handling and user feedback
- ✅ Better CORS handling
- ✅ Detailed error messages
- ✅ No secret key required (simple setup)

---

## Step 1: Create a Google Sheet

1. Create a new Google Sheet at [sheets.google.com](https://sheets.google.com)
   - **You can leave it completely empty!** The script will automatically create the headers.
   - **Important**: The script must be attached to this sheet (created from Extensions → Apps Script)

---

## Step 2: Create Google Apps Script

1. **In your Google Sheet**, go to **Extensions → Apps Script**
   - ⚠️ **Important**: Open Apps Script FROM the sheet where you want to save data
   - The script will automatically use the active spreadsheet (no Spreadsheet ID needed!)
2. Delete any existing code and paste the code from `google-apps-script.js` file
3. **Optionally change `Sheet1`** on line 66 if your sheet has a different name (defaults to first sheet if not found)

### The script will automatically:
- Use the active spreadsheet (the sheet where the script is attached)
- Create column headers if they don't exist
- Format headers with blue background and white text
- Freeze the header row
- Auto-resize columns for better readability

### No Spreadsheet ID needed!
The script uses `SpreadsheetApp.getActiveSpreadsheet()` which automatically uses the sheet where the script is attached. Much simpler! 🎉

---

## Step 3: Deploy as Web App

1. In Apps Script, click **Deploy → New deployment**
2. Click the gear icon ⚙️ next to **Select type** and choose **Web app**
3. Configure:
   - **Description**: `Form Submission Handler` (optional)
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` (required for public form submissions)
4. Click **Deploy**
5. **Authorize the script**:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [Your Project] (unsafe)"
   - Click "Allow"
6. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/AKfycb.../exec`)
   - You'll need this in the next step

---

## Step 4: Configure Environment Variables

1. Open the `.env` file in your project root
2. Add/update the following variable:

```env
# Google Apps Script Web App URL
GAS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

3. **Replace the value**:
   - `GAS_WEB_APP_URL`: Paste the Web App URL you copied in Step 3

**Example:**
```env
GAS_WEB_APP_URL=https://script.google.com/macros/s/AKfycbxYz1234567890/exec
```

4. **Important**: Never commit `.env` to git! It should already be in `.gitignore`

---

## Step 5: Test the Integration

1. **Start your development server** (if not already running):
   ```bash
   pnpm dev
   ```

2. **Fill out the form** on your website
3. **Check your Google Sheet** - you should see:
   - Headers automatically created (Timestamp, Name, Address, Class, School, Phone, WhatsApp, Age)
   - A new row with your form data
   - Headers formatted with blue background

### Testing with cURL (Optional)

You can also test the API endpoint directly:

```bash
curl -X POST http://localhost:8080/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "address": "123 Test Street",
    "class": "12th",
    "school": "Test School",
    "phone": "+91 9800000000",
    "whatsapp": "+91 9800000000",
    "age": "18"
  }'
```

---

## Troubleshooting

### Form submissions not appearing in Google Sheets

1. **Check that script is attached to the correct sheet**: Make sure you opened Apps Script from the Google Sheet where you want data saved
2. **Check the Sheet name**: Make sure `Sheet1` matches your actual sheet name (case-sensitive), or change it in the script (line 66)
3. **Check deployment**: Make sure you deployed as a Web App with "Anyone" access
4. **Check authorization**: Make sure you authorized the script when deploying
5. **Check environment variables**: Verify `.env` file has the correct `GAS_WEB_APP_URL`
6. **Check server logs**: Look for error messages in your terminal where `pnpm dev` is running
7. **Check browser console**: Open browser DevTools (F12) and check the Console tab for errors

### Getting "Form submission service is not configured"

- Make sure `.env` file exists in the project root
- Make sure `GAS_WEB_APP_URL` is set in `.env`
- **Restart your development server** after updating `.env`:
  ```bash
  # Stop the server (Ctrl+C)
  # Then start again:
  pnpm dev
  ```

### Getting "Internal server error"

- Check your server terminal for detailed error messages
- Verify the Google Apps Script Web App URL is correct
- Make sure the Apps Script is deployed and authorized
- Make sure the script is attached to the correct Google Sheet (open Apps Script from that sheet)

### Headers not appearing or wrong format

- The script automatically creates headers on the first submission
- If headers exist but are wrong, delete the first row in your sheet and the script will recreate them
- Make sure the script has permission to edit the sheet

---

## Adding More Form Fields

To add more fields to your form:

1. **Update the form component** (`client/components/JoinUsForm.tsx`):
   - Add the field to the `formData` state
   - Add the input field to the JSX

2. **Update Google Apps Script** (`google-apps-script.js`):
   - Add the new field name to the headers array (line ~45)
   - Add the new field data to the `sheet.appendRow([...])` array (line ~60)
   - Update the column count in `autoResizeColumns` if needed

3. **Update the Express route** (`server/routes/submit-form.ts`):
   - Add the new field to the `FormSubmissionRequest` interface
   - Add validation for the new field if needed

---

## Security Notes

- ✅ The script is accessible to anyone with the URL (required for form submissions)
- ✅ Consider limiting access to your Google Sheet to trusted people only
- ✅ Monitor form submissions regularly for suspicious activity
- ✅ If you need more security, you can add IP filtering or rate limiting on the Express server

---

## Need Help?

If you encounter issues:
1. Check the server console for error messages
2. Check the browser console for client-side errors
3. Verify all environment variables are set correctly
4. Test the Google Apps Script directly using the test function
5. Check the Google Apps Script execution logs (View → Executions in Apps Script)

---

## Files Modified

- ✅ `server/routes/submit-form.ts` - Express API route handler (no secret required)
- ✅ `server/index.ts` - Registered the form submission route
- ✅ `client/components/JoinUsForm.tsx` - Form component that submits to Express API
- ✅ `google-apps-script.js` - Google Apps Script code (auto-creates headers)
- ✅ `.env` - Environment variables (only GAS_WEB_APP_URL needed)

---

## Quick Start Checklist

- [ ] Created Google Sheet and copied Spreadsheet ID
- [ ] Created Google Apps Script and pasted the code
- [ ] Replaced `YOUR_SPREADSHEET_ID` in the script
- [ ] Deployed as Web App with "Anyone" access
- [ ] Authorized the script
- [ ] Copied the Web App URL
- [ ] Added `GAS_WEB_APP_URL` to `.env` file
- [ ] Restarted development server
- [ ] Tested form submission
- [ ] Verified data appears in Google Sheet

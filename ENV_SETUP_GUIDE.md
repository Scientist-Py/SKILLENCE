# How to Set Up Admin Credentials in .env File

## Current Issue
Your `.env` file doesn't have `ADMIN_USERNAME` and `ADMIN_PASSWORD` set.

## Solution

### Step 1: Open your `.env` file
The `.env` file is in the root of your project (same folder as `package.json`).

### Step 2: Add these lines to your `.env` file:

```env
# Admin Panel Credentials
ADMIN_USERNAME=your_username_here
ADMIN_PASSWORD=your_password_here
```

### Step 3: Replace the values
- Replace `your_username_here` with your actual username
- Replace `your_password_here` with your actual password

### Step 4: Make sure there are NO spaces
❌ **WRONG:**
```env
ADMIN_USERNAME = myusername
ADMIN_PASSWORD = mypassword
```

✅ **CORRECT:**
```env
ADMIN_USERNAME=myusername
ADMIN_PASSWORD=mypassword
```

### Step 5: Save the file and restart your server

```bash
# Stop server (Ctrl+C)
pnpm dev
```

## Example .env file:

```env
# Google Apps Script Web App URL
GAS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Admin Panel Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=SecurePassword123!

# Other environment variables
PING_MESSAGE=ping
```

## Troubleshooting

### If login still doesn't work:

1. **Check server terminal** - Look for the debug logs I added. They will show:
   - What username/password you're sending
   - What the server is reading from .env
   - Whether they match

2. **Common issues:**
   - Extra spaces in .env file
   - Quotes around values (don't use quotes)
   - Server not restarted after changing .env
   - .env file in wrong location (should be in project root)

3. **Test the server is reading .env:**
   - Check the server terminal when you try to login
   - You should see debug output showing the values

## After fixing:

1. Save `.env` file
2. Restart server (`pnpm dev`)
3. Try logging in again
4. Check server terminal for debug output


# Fix: "Unexpected token 'A', 'A server e'... is not valid JSON" Error

## The Problem

When submitting the form, you're getting an error that says the server returned HTML or plain text instead of JSON. This usually means:

1. **The dev server isn't running** - The API route isn't accessible
2. **The server crashed** - There's an error in the server code
3. **Route not configured** - The API route isn't being hit

## Quick Fix

### Step 1: Make Sure Server is Running

```bash
# Stop any running server (Ctrl+C)
# Then start it again:
pnpm dev
```

### Step 2: Check Server Terminal

When you start the server, you should see:
```
=== Server Starting ===
ADMIN_USERNAME: 123
ADMIN_PASSWORD: ***
GAS_WEB_APP_URL: https://script.google.com/...
======================
```

If you don't see this, the server isn't starting correctly.

### Step 3: Test the API Endpoint

Open in browser: `http://localhost:8080/api/ping`

You should see: `{"message":"ping"}`

If you see HTML or an error, the server isn't working.

### Step 4: Check Environment Variables

Open in browser: `http://localhost:8080/api/debug/env`

You should see JSON with your environment variables.

## Common Issues

### Issue 1: Server Not Running
**Solution**: Run `pnpm dev` in the terminal

### Issue 2: Port Already in Use
**Solution**: 
- Kill the process using port 8080
- Or change the port in `vite.config.ts`

### Issue 3: Missing Dependencies
**Solution**: 
```bash
pnpm install
```

### Issue 4: Environment Variables Not Loaded
**Solution**: 
- Check `.env` file exists in project root
- Make sure it has `GAS_WEB_APP_URL` set
- Restart server after changing `.env`

## Test Steps

1. **Start server**: `pnpm dev`
2. **Check terminal**: Should see "Server Starting" message
3. **Test API**: Go to `http://localhost:8080/api/ping`
4. **Submit form**: Try submitting the form again

## If Still Not Working

1. Check browser console (F12) for errors
2. Check server terminal for error messages
3. Verify `.env` file has correct `GAS_WEB_APP_URL`
4. Make sure Google Apps Script is deployed correctly

---

**The form should work once the server is running properly!** 🚀


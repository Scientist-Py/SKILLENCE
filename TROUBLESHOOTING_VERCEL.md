# Troubleshooting Vercel Empty Response Error

## Error: "Server returned empty response. Please check if the server is running and API routes are configured correctly."

This error means your API endpoint is returning an empty response. Here's how to fix it:

## Step 1: Verify Environment Variables in Vercel

**This is the most common cause!**

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Make sure these are set:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `GAS_WEB_APP_URL` (most important for form submission!)
   - `PING_MESSAGE` (optional)

5. **After adding/updating environment variables, you MUST redeploy!**
   - Go to **Deployments** tab
   - Click **⋯** (three dots) on latest deployment
   - Click **Redeploy**

## Step 2: Check Vercel Function Logs

1. Go to your Vercel project dashboard
2. Click on **Functions** tab
3. Look for `/api/submit-form` or `/api/index.ts`
4. Check if there are any errors in the logs
5. Click on a function invocation to see detailed logs

## Step 3: Test the API Endpoint Directly

Test if your API is working by visiting:
- `https://your-domain.vercel.app/api/ping` - Should return `{"message":"ping"}`
- `https://your-domain.vercel.app/api/debug/env` - Should show environment variables

If these don't work, the serverless function isn't set up correctly.

## Step 4: Verify File Structure

Make sure you have:
- ✅ `api/index.ts` file exists
- ✅ `vercel.json` file exists in project root
- ✅ Files are committed and pushed to GitHub

## Step 5: Check Build Logs

1. Go to **Deployments** tab in Vercel
2. Click on your latest deployment
3. Check the **Build Logs** for any errors
4. Look for TypeScript compilation errors

## Step 6: Common Issues and Solutions

### Issue: Environment variables not set
**Solution:** Add them in Vercel dashboard and redeploy

### Issue: GAS_WEB_APP_URL is missing
**Solution:** This is required for form submission. Add it in Vercel environment variables.

### Issue: Serverless function not being invoked
**Solution:** 
- Check that `api/index.ts` exists
- Check that `vercel.json` has the correct rewrites
- Make sure files are pushed to GitHub

### Issue: TypeScript compilation errors
**Solution:**
- Check build logs in Vercel
- Make sure all dependencies are in `package.json`
- Run `npm run typecheck` locally to find errors

## Step 7: Test Locally First

Before deploying to Vercel, test locally:

```bash
# Start local server
pnpm dev

# Test the form submission
# Open http://localhost:8080
# Fill and submit the form
# Check if it works locally
```

If it works locally but not on Vercel:
- Environment variables are likely not set in Vercel
- Or the serverless function isn't configured correctly

## Step 8: Debug the Serverless Function

Add this to your `api/index.ts` temporarily to see what's happening:

```typescript
import serverless from "serverless-http";
import { createServer } from "../server";

const app = createServer();

const handler = serverless(app, {
  binary: ['application/json', 'application/*+json'],
});

export default async (req: any, res: any) => {
  console.log('=== API Request ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Path:', req.path);
  console.log('Body:', req.body);
  console.log('==================');
  
  try {
    return await handler(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
};
```

Then check Vercel function logs to see what's being logged.

## Still Not Working?

1. Check Vercel **Logs** tab for detailed error messages
2. Verify your Google Apps Script URL is correct and accessible
3. Test your Google Apps Script URL directly in a browser
4. Make sure your Vercel project is connected to the correct GitHub repository
5. Try redeploying from scratch


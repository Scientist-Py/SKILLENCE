// Vercel serverless function entry point
// This file handles all API routes for Vercel deployment
import serverless from "serverless-http";
import { createServer } from "../server/index";

// Create Express app
const app = createServer();

// Wrap Express app with serverless-http for Vercel
// Configure to handle binary responses
const handler = serverless(app, {
  binary: ['application/json', 'text/*', 'application/javascript'],
});

// Export as Vercel serverless function
export default handler;


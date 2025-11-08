import serverless from "serverless-http";
import { createServer } from "../server";

// Create the Express app
const app = createServer();

// Wrap the Express app with serverless-http for Vercel
// Vercel automatically routes /api/* requests to this file
const handler = serverless(app, {
  binary: ['application/json', 'application/*+json'],
});

// Export the handler for Vercel serverless functions
export default handler;


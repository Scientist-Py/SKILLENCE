import serverless from "serverless-http";
import { createServer } from "../server";

// Create the Express app once at module load
const app = createServer();

// Wrap the Express app with serverless-http for Vercel
const handler = serverless(app, {
  binary: ['application/json', 'application/*+json'],
});

// Export the handler for Vercel serverless functions
// Vercel expects a default export that handles (req, res) => Promise
export default handler;


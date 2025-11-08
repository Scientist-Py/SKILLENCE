// Vercel serverless function entry point
// This file handles all API routes for Vercel deployment
import serverless from "serverless-http";
import { createServer } from "../server/index";

const app = createServer();

// Wrap Express app with serverless-http for Vercel
const handler = serverless(app);

// Export as Vercel serverless function
export default handler;


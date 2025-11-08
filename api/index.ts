// Vercel serverless function entry point
// This file handles all API routes for Vercel deployment
import { createServer } from "../server/index";

const app = createServer();

// Export as Vercel serverless function
export default async function handler(req: any, res: any) {
  return new Promise((resolve) => {
    app(req, res, () => {
      resolve(undefined);
    });
  });
}


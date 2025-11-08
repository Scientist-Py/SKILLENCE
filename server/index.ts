// Load environment variables first
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleFormSubmission } from "./routes/submit-form";
import { getSubmissions, getDashboardStats, checkAuth } from "./routes/admin";

export function createServer() {
  // Debug: Log environment variables on server startup
  console.log("=== Server Starting ===");
  console.log("ADMIN_USERNAME:", process.env.ADMIN_USERNAME || "(not set)");
  console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD ? "***" : "(not set)");
  console.log("GAS_WEB_APP_URL:", process.env.GAS_WEB_APP_URL || "(not set)");
  console.log("======================");

  const app = express();

  // Middleware
  app.use(cors({
    origin: process.env.VERCEL 
      ? true // Allow all origins on Vercel (handled by vercel.json headers)
      : process.env.VERCEL_URL 
        ? [`https://${process.env.VERCEL_URL}`, 'http://localhost:8080']
        : '*',
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Debug endpoint to check environment variables (remove in production)
  app.get("/api/debug/env", (_req, res) => {
    res.json({
      hasUsername: !!process.env.ADMIN_USERNAME,
      hasPassword: !!process.env.ADMIN_PASSWORD,
      username: process.env.ADMIN_USERNAME || "(not set)",
      password: process.env.ADMIN_PASSWORD ? "***" : "(not set)",
      allEnvKeys: Object.keys(process.env).filter(key => key.includes("ADMIN") || key.includes("GAS")),
    });
  });

  app.get("/api/demo", handleDemo);

  // Form submission route
  app.post("/api/submit-form", handleFormSubmission);

  // Admin routes
  app.post("/api/admin/login", checkAuth);
  app.get("/api/admin/submissions", getSubmissions);
  app.get("/api/admin/stats", getDashboardStats);

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      env: {
        hasGasUrl: !!process.env.GAS_WEB_APP_URL,
        hasAdminUsername: !!process.env.ADMIN_USERNAME,
        hasAdminPassword: !!process.env.ADMIN_PASSWORD,
      }
    });
  });

  // Catch-all for unmatched API routes
  app.all("/api/*", (req, res) => {
    console.log(`Unmatched API route: ${req.method} ${req.path}`);
    res.status(404).json({ 
      ok: false, 
      error: `API route not found: ${req.method} ${req.path}` 
    });
  });

  return app;
}

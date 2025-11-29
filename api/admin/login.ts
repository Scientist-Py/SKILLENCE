import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;
  
  // Get credentials from environment variables
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Debug logging (remove in production)
  console.log("=== Login Attempt ===");
  console.log("Received username:", username);
  console.log("Received password:", password ? "***" : "(empty)");
  console.log("ADMIN_USERNAME from .env:", adminUsername ? adminUsername : "(not set)");
  console.log("ADMIN_PASSWORD from .env:", adminPassword ? "***" : "(not set)");

  // Check if credentials are configured
  if (!adminUsername || !adminPassword) {
    console.error("Admin credentials not configured in environment variables");
    return res.status(500).json({
      ok: false,
      error: "Admin credentials not configured. Please set ADMIN_USERNAME and ADMIN_PASSWORD in environment variables.",
    });
  }

  // Validate username and password
  const usernameMatch = username === adminUsername;
  const passwordMatch = password === adminPassword;
  
  console.log("Username match:", usernameMatch);
  console.log("Password match:", passwordMatch);

  if (usernameMatch && passwordMatch) {
    console.log("✅ Authentication successful");
    return res.json({ ok: true, authenticated: true });
  }

  console.log("❌ Authentication failed");
  return res.status(401).json({ ok: false, error: "Invalid username or password" });
}

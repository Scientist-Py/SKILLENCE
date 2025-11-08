import type { VercelRequest, VercelResponse } from '@vercel/node';

interface FormSubmissionRequest {
  name: string;
  address: string;
  class: string;
  school: string;
  phone: string;
  whatsapp: string;
  age: string;
}

interface GoogleAppsScriptResponse {
  ok: boolean;
  error?: string;
}

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

  try {
    const formData: FormSubmissionRequest = req.body;

    // Validate required fields
    if (!formData.name || !formData.address || !formData.class || !formData.school || !formData.phone || !formData.age) {
      return res.status(400).json({ 
        ok: false, 
        error: "Missing required fields" 
      });
    }

    // Get Google Apps Script Web App URL from environment
    const gasWebAppUrl = process.env.GAS_WEB_APP_URL;

    if (!gasWebAppUrl) {
      console.error("GAS_WEB_APP_URL is not configured");
      return res.status(500).json({ 
        ok: false, 
        error: "Form submission service is not configured" 
      });
    }

    // Prepare payload for Google Apps Script
    const payload = formData;

    // Forward request to Google Apps Script
    console.log("Sending form data to Google Apps Script:", payload);
    console.log("Google Apps Script URL:", gasWebAppUrl);
    
    const response = await fetch(gasWebAppUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Get response text first to handle potential non-JSON responses
    const responseText = await response.text();
    console.log("Google Apps Script response status:", response.status);
    console.log("Google Apps Script response:", responseText);

    let result: GoogleAppsScriptResponse;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse Google Apps Script response:", parseError);
      return res.status(500).json({ 
        ok: false, 
        error: "Invalid response from Google Apps Script: " + responseText.substring(0, 200)
      });
    }

    if (!response.ok || !result.ok) {
      console.error("Google Apps Script error:", result.error);
      return res.status(500).json({ 
        ok: false, 
        error: result.error || "Failed to submit form data" 
      });
    }

    console.log("Form data submitted successfully");
    return res.json({ ok: true });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return res.status(500).json({ 
      ok: false, 
      error: error instanceof Error ? error.message : "Internal server error" 
    });
  }
}

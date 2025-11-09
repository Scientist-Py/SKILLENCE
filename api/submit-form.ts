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
    
    // Add timeout to prevent hanging requests (25 seconds for Vercel serverless)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    
    let response: Response;
    try {
      response = await fetch(gasWebAppUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error("Request to Google Apps Script timed out");
        return res.status(504).json({ 
          ok: false, 
          error: "Request timed out. Please try again." 
        });
      }
      console.error("Network error calling Google Apps Script:", fetchError);
      return res.status(500).json({ 
        ok: false, 
        error: `Network error: ${fetchError instanceof Error ? fetchError.message : "Failed to connect to Google Apps Script"}` 
      });
    }

    // Get response text first to handle potential non-JSON responses
    let responseText: string;
    try {
      responseText = await response.text();
      console.log("Google Apps Script response status:", response.status);
      console.log("Google Apps Script response:", responseText);
    } catch (textError) {
      console.error("Failed to read response from Google Apps Script:", textError);
      return res.status(500).json({ 
        ok: false, 
        error: "Failed to read response from Google Apps Script" 
      });
    }

    // Handle non-200 status codes
    if (!response.ok) {
      console.error("Google Apps Script returned error status:", response.status, responseText);
      return res.status(500).json({ 
        ok: false, 
        error: `Google Apps Script error (${response.status}): ${responseText.substring(0, 200)}` 
      });
    }

    let result: GoogleAppsScriptResponse;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse Google Apps Script response:", parseError);
      console.error("Response text:", responseText);
      return res.status(500).json({ 
        ok: false, 
        error: "Invalid response from Google Apps Script. Please check the server logs." 
      });
    }

    if (!result.ok) {
      console.error("Google Apps Script returned error:", result.error);
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

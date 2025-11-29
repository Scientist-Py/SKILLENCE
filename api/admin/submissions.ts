import type { VercelRequest, VercelResponse } from '@vercel/node';

interface Submission {
  date: string;
  time: string;
  name: string;
  address: string;
  class: string;
  age: string;
  school: string;
  phone: string;
  whatsapp: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const gasWebAppUrl = process.env.GAS_WEB_APP_URL;

    if (!gasWebAppUrl) {
      return res.status(500).json({
        ok: false,
        error: "Google Apps Script URL not configured",
      });
    }

    // Fetch data from Google Apps Script (doGet function)
    const urlWithParam = `${gasWebAppUrl}?action=getData`;
    const response = await fetch(urlWithParam, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    // Get response text first to check if it's JSON
    const responseText = await response.text();
    
    // Check if response is HTML (error page)
    if (responseText.trim().startsWith("<!DOCTYPE") || responseText.trim().startsWith("<html")) {
      console.error("Google Apps Script returned HTML instead of JSON:", responseText.substring(0, 200));
      return res.status(500).json({
        ok: false,
        error: "Google Apps Script returned an error page. Make sure doGet function is deployed and accessible.",
      });
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse Google Apps Script response:", responseText.substring(0, 200));
      return res.status(500).json({
        ok: false,
        error: "Invalid JSON response from Google Apps Script",
      });
    }

    if (!result.ok) {
      return res.status(500).json({
        ok: false,
        error: result.error || "Failed to fetch submissions",
      });
    }

    const submissions: Submission[] = result.data || [];

    return res.json({
      ok: true,
      data: submissions,
      total: submissions.length,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : "Failed to fetch submissions",
    });
  }
}

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

/**
 * Helper function to parse date string (MM/dd/yyyy) to Date object
 */
function parseDate(dateString: string): Date | null {
  if (!dateString) return null;
  
  try {
    // Handle MM/dd/yyyy format
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const month = parseInt(parts[0], 10) - 1; // Month is 0-indexed
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    
    // Try ISO format as fallback
    return new Date(dateString);
  } catch {
    return null;
  }
}

/**
 * Helper function to format date as MM/dd/yyyy
 */
function formatDate(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
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

    // Fetch submissions from Google Apps Script
    const urlWithParam = `${gasWebAppUrl}?action=getStats`;
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
        error: result.error || "Failed to fetch data",
      });
    }

    const submissions: Submission[] = result.data || [];

    // Calculate statistics
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    let registrationsToday = 0;
    let registrationsThisWeek = 0;
    let registrationsThisMonth = 0;
    const byClass: Record<string, number> = {};
    const bySchool: Record<string, number> = {};

    submissions.forEach((sub) => {
      // Parse date (format: MM/dd/yyyy)
      const subDate = parseDate(sub.date);
      
      if (subDate) {
        if (subDate >= today) {
          registrationsToday++;
        }
        if (subDate >= weekAgo) {
          registrationsThisWeek++;
        }
        if (subDate >= monthAgo) {
          registrationsThisMonth++;
        }
      }

      // Count by class
      if (sub.class) {
        byClass[sub.class] = (byClass[sub.class] || 0) + 1;
      }

      // Count by school
      if (sub.school) {
        bySchool[sub.school] = (bySchool[sub.school] || 0) + 1;
      }
    });

    // Calculate daily trends (last 7 days)
    const dailyTrends: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = formatDate(date);
      dailyTrends[dateStr] = 0;
    }

    submissions.forEach((sub) => {
      const subDate = parseDate(sub.date);
      if (subDate) {
        const dateStr = formatDate(subDate);
        if (dailyTrends.hasOwnProperty(dateStr)) {
          dailyTrends[dateStr]++;
        }
      }
    });

    // Calculate age distribution
    const byAge: Record<string, number> = {};
    submissions.forEach((sub) => {
      if (sub.age) {
        byAge[sub.age] = (byAge[sub.age] || 0) + 1;
      }
    });

    // Calculate hourly distribution (for time-based analysis)
    const byHour: Record<string, number> = {};
    submissions.forEach((sub) => {
      if (sub.time) {
        const hour = sub.time.split(":")[0];
        if (hour) {
          byHour[hour] = (byHour[hour] || 0) + 1;
        }
      }
    });

    // Get top schools (sorted)
    const topSchools = Object.entries(bySchool)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .reduce((acc, [school, count]) => {
        acc[school] = count;
        return acc;
      }, {} as Record<string, number>);

    const stats = {
      totalRegistrations: submissions.length,
      registrationsToday,
      registrationsThisWeek,
      registrationsThisMonth,
      byClass,
      bySchool,
      byAge,
      byHour,
      dailyTrends,
      topSchools,
    };

    return res.json({
      ok: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : "Failed to fetch statistics",
    });
  }
}

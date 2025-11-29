import type { VercelRequest, VercelResponse } from '@vercel/node';

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

  const groqApiKey = process.env.GROQ_API_KEY;
  
  return res.json({
    hasApiKey: !!groqApiKey,
    apiKeyLength: groqApiKey ? groqApiKey.length : 0,
    apiKeyPrefix: groqApiKey ? groqApiKey.substring(0, 10) + '...' : 'Not set',
    message: groqApiKey 
      ? 'API key is configured. Check Vercel function logs for detailed errors.' 
      : 'ERROR: GROQ_API_KEY is not set in Vercel environment variables!'
  });
}


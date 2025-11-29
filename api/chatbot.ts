import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ChatRequest {
  message: string;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      response: 'Method not allowed. Please use POST request.'
    });
  }

  try {
    // Log request details
    console.log('Chatbot request received');
    console.log('Request method:', req.method);
    console.log('Request body:', req.body);

    const { message }: ChatRequest = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Message is required',
        response: 'Please provide a message to chat.'
      });
    }

    // Get Groq API key from environment
    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      console.error('GROQ_API_KEY is not configured');
      return res.status(500).json({ 
        error: 'Chatbot service is not configured. Please contact us via WhatsApp for assistance.',
        response: 'Chatbot service is not configured. Please contact us via WhatsApp for assistance.'
      });
    }

    console.log('Groq API Key present:', groqApiKey ? 'Yes' : 'No');
    console.log('Message received:', message.trim().substring(0, 50));

    // System prompt to keep chatbot focused on Skillence courses
    const systemPrompt = `You are a helpful assistant for Skillence, an AI education platform. Your role is to answer questions about:
- Skillence courses and programs
- Course curriculum and modules
- Enrollment process
- Course duration and structure
- Projects and hands-on learning
- Support and mentorship
- Pricing and enrollment

CRITICAL GUIDELINES:
- ALWAYS use simple English in every response. Use easy words that everyone can understand. Avoid complex terms.
- Keep responses friendly, clear, and easy to read
- Only answer questions related to Skillence courses, programs, and services
- If asked about unrelated topics, politely redirect to Skillence-related questions
- If you don't know something specific, suggest contacting via WhatsApp for detailed information
- Keep responses concise and clear (2-3 sentences when possible)

SPECIAL INSTRUCTIONS:

1. When asked about COURSE DURATION:
   - Say the course takes approximately 4 months to complete
   - Mention it's a comprehensive program that takes around 4 months
   - Don't say "exactly 4 months" or "minimum 4 months" - be natural and say "approximately 4 months" or "around 4 months"
   - Example: "Our course is designed to be completed in approximately 4 months. It's a comprehensive program that covers everything you need to master AI."

2. When asked about SYLLABUS or CURRICULUM:
   - List the major topics organized by the 4-month program structure
   - Our complete 4-month program covers:
   
   MONTH 1 - Introduction to Artificial Intelligence:
   * AI Fundamentals and the AI Revolution
   * Using AI for studies and homework
   * Python Programming Basics (data types, variables, loops, conditionals)
   * Python Development Environment Setup
   * Building your first AI projects (Quiz Master, Calculator, Tic-Tac-Toe)
   * Introduction to 50+ AI Tools
   
   MONTH 2 - Advanced Python & AI Integration:
   * Advanced Python (functions, libraries, error handling, JSON, APIs)
   * Smart Automation (WhatsApp/Telegram automation, Email automation, Task scheduling)
   * No-Code and Low-Code AI Development
   * Creative AI Tools & Prompt Engineering (ChatGPT, image generation, infographics)
   * Python Web Development (converting scripts to websites, API connections, E-commerce)
   
   MONTH 3 - Data Analytics & Visualization:
   * Excel Fundamentals & Smart Formulas
   * Data Cleaning & Preparation
   * Data Visualization with Charts
   * Pivot Tables & Advanced Analysis
   * Dashboard Design & Python Integration with Excel
   
   MONTH 4 - AI & Automation Project Mastery (80+ Real Projects):
   * Personal AI Projects (AI Assistant, Notes Maker, Quiz Generator, Career Suggestion)
   * Automation Systems (Auto Message Sender, AI Chatbot, Registration Systems)
   * Computer Vision Projects (Face Detection, Attendance System, Hand Gestures, Eye Blink Detector)
   * Voice AI Projects (Voice Assistant, Speech-to-Text, Voice-Controlled Apps)
   * AI Games (Rock-Paper-Scissors with Vision, Snake Game, Flappy Bird)
   * No-Code Website Builders (Portfolio, Business Landing Page, Management Systems)
   
   - After listing topics, always say: "This is a summary of our 4-month program. For the complete detailed syllabus with all topics and subtopics, please visit our website or contact us via WhatsApp."
   - Use simple English and make it easy to understand

Skillence Program Details:
- 4 comprehensive modules
- 80+ real-world projects
- Master 50+ AI tools and technologies
- Learn Python, AI fundamentals, and automation
- Offline coaching center
- 24/7 support from expert mentors
- Suitable for beginners
- Industry-recognized certification`;

    // Prepare the request to Groq API
    const requestBody = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: message.trim(),
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    };

    console.log('Sending request to Groq API with model: llama-3.3-70b-versatile');

    let groqResponse: Response;
    try {
      groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
    } catch (fetchError) {
      console.error('Network error calling Groq API:', fetchError);
      return res.status(500).json({ 
        error: 'Network error. Please check your connection and try again.',
        response: 'I\'m having trouble connecting to the AI service. Please try again or contact us via WhatsApp for immediate assistance.'
      });
    }

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('Groq API error status:', groqResponse.status);
      console.error('Groq API error response:', errorText);
      
      // Try to parse error for better error message
      let errorMessage = 'Unable to process your question. Please try again or contact us via WhatsApp.';
      try {
        const errorData = JSON.parse(errorText);
        console.error('Parsed error data:', errorData);
        if (errorData.error?.message) {
          console.error('Groq API error message:', errorData.error.message);
          errorMessage = `API Error: ${errorData.error.message}. Please contact us via WhatsApp for assistance.`;
          
          // If it's a model error, try alternative model
          if (errorData.error.message.includes('model') || errorData.error.message.includes('not found')) {
            errorMessage = 'The AI model is temporarily unavailable. Please contact us via WhatsApp for immediate assistance.';
          }
          // If it's an auth error
          else if (errorData.error.message.includes('auth') || errorData.error.message.includes('key') || groqResponse.status === 401) {
            errorMessage = 'API authentication failed. Please contact us via WhatsApp for assistance.';
          }
        }
      } catch (e) {
        console.error('Failed to parse error response:', e);
        errorMessage = `API returned error (${groqResponse.status}). Please contact us via WhatsApp for assistance.`;
      }
      
      return res.status(500).json({ 
        error: errorMessage,
        response: errorMessage
      });
    }

    const data: GroqResponse = await groqResponse.json();

    if (!data.choices || data.choices.length === 0 || !data.choices[0]?.message?.content) {
      console.error('Invalid response from Groq API:', data);
      return res.status(500).json({ 
        error: 'No response from chatbot. Please contact us via WhatsApp for assistance.',
        response: 'I apologize, but I\'m having trouble processing your request. Please contact us via WhatsApp for immediate assistance.'
      });
    }

    const response = data.choices[0].message.content;

    if (!response || response.trim().length === 0) {
      return res.status(500).json({ 
        error: 'Empty response from chatbot. Please contact us via WhatsApp for assistance.',
        response: 'I apologize, but I couldn\'t generate a response. Please contact us via WhatsApp for immediate assistance.'
      });
    }

    return res.json({ 
      response: response.trim(),
      ok: true 
    });

  } catch (error) {
    console.error('Error processing chatbot request:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';
    console.error('Error details:', errorMessage);
    console.error('Error stack:', errorStack);
    
    // Ensure we always return valid JSON
    try {
      return res.status(500).json({ 
        error: `Internal server error: ${errorMessage}. Please contact us via WhatsApp for assistance.`,
        response: `I encountered an error: ${errorMessage}. Please contact us via WhatsApp for immediate assistance.`,
        ok: false
      });
    } catch (jsonError) {
      // If JSON.stringify fails, send plain text
      console.error('Failed to send JSON response:', jsonError);
      res.setHeader('Content-Type', 'text/plain');
      return res.status(500).send('Internal server error. Please contact us via WhatsApp.');
    }
  }
}


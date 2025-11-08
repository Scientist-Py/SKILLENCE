/**
 * Safely parse JSON response from fetch API
 * Handles empty responses and non-JSON responses gracefully
 */
export async function safeJsonParse<T = any>(response: Response): Promise<T> {
  // Read response body once (can only be read once)
  const text = await response.text();
  
  // Check if response body is empty
  if (!text || text.trim() === '') {
    throw new Error('Server returned empty response. Please check if the server is running and API routes are configured correctly.');
  }

  // Check if response has JSON content type
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(text || 'Server returned non-JSON response');
  }

  // Try to parse JSON
  try {
    return JSON.parse(text) as T;
  } catch (parseError) {
    throw new Error('Invalid JSON response from server');
  }
}


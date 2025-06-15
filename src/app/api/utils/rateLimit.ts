import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for rate limiting
// In production, you should use Redis or another distributed store
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  }
}

const store: RateLimitStore = {};

/**
 * Rate limiting middleware for API routes
 * @param req Next.js request object
 * @param maxRequests Maximum number of requests allowed in the time window
 * @param windowMs Time window in milliseconds
 * @returns A response if rate limit is exceeded, or null if request can proceed
 */
export function rateLimit(
  req: NextRequest, 
  maxRequests: number = 10, 
  windowMs: number = 60 * 1000 // 1 minute by default
): NextResponse | null {  // Get IP address from request
  // In production with a proxy, you might need to use X-Forwarded-For header
  const ip = req.headers.get('x-forwarded-for') || 
             req.headers.get('x-real-ip') || 
             'unknown';
  const now = Date.now();
  
  // Initialize or get the existing rate limit data
  if (!store[ip]) {
    store[ip] = {
      count: 0,
      resetTime: now + windowMs
    };
  }
  
  // Reset count if the time window has expired
  if (now > store[ip].resetTime) {
    store[ip] = {
      count: 0,
      resetTime: now + windowMs
    };
  }
  
  // Increment request count
  store[ip].count++;
  
  // Check if rate limit is exceeded
  if (store[ip].count > maxRequests) {
    // Calculate remaining time until reset
    const remainingSeconds = Math.ceil((store[ip].resetTime - now) / 1000);
    
    // Return error response with rate limit headers
    return NextResponse.json(
      { error: 'Rate limit exceeded, please try again later' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.ceil(store[ip].resetTime / 1000).toString(),
          'Retry-After': remainingSeconds.toString()
        }
      }
    );
  }
  
  return null;
}

// Cleanup function to prevent memory leaks
// Should be called periodically in a production environment
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  
  Object.keys(store).forEach(key => {
    if (now > store[key].resetTime) {
      delete store[key];
    }
  });
}

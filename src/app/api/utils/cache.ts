// Simple in-memory cache system
// In production, consider using Redis or another distributed cache

interface CacheItem<T> {
  data: T;
  expiry: number;
}

interface Cache {
  [key: string]: CacheItem<unknown>;
}

// Initialize cache
const cache: Cache = {};

// API usage counter
let apiUsageCounter = {
  gmb_search: 0,
  places_details: 0,
  lastResetDate: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
};

/**
 * Get an item from the cache
 * @param key Cache key
 * @returns The cached item or null if not found or expired
 */
export function getCacheItem<T>(key: string): T | null {
  const item = cache[key];
  
  // Return null if item doesn't exist
  if (!item) return null;
  
  // Return null if item is expired
  if (Date.now() > item.expiry) {
    delete cache[key];
    return null;
  }
  
  return item.data as T;
}

/**
 * Set an item in the cache
 * @param key Cache key
 * @param data Data to cache
 * @param ttlMs Time to live in milliseconds (default: 1 hour)
 */
export function setCacheItem<T>(key: string, data: T, ttlMs: number = 60 * 60 * 1000): void {
  cache[key] = {
    data,
    expiry: Date.now() + ttlMs
  };
}

/**
 * Clear expired items from the cache
 */
export function cleanupCache(): void {
  const now = Date.now();
  
  Object.keys(cache).forEach(key => {
    if (now > cache[key].expiry) {
      delete cache[key];
    }
  });
}

/**
 * Increment the API usage counter and check if limit is reached
 * @param apiType The type of API being used ('gmb_search' or 'places_details')
 * @param dailyLimit The daily limit for this API type
 * @returns true if under limit, false if limit reached
 */
export function trackApiUsage(apiType: 'gmb_search' | 'places_details', dailyLimit: number): boolean {
  // Reset counters if it's a new day
  const today = new Date().toISOString().split('T')[0];
  if (today !== apiUsageCounter.lastResetDate) {
    apiUsageCounter = {
      gmb_search: 0,
      places_details: 0,
      lastResetDate: today
    };
  }
  
  // Increment counter
  apiUsageCounter[apiType]++;
  
  // Check if limit is reached
  return apiUsageCounter[apiType] <= dailyLimit;
}

/**
 * Get current API usage statistics
 */
export function getApiUsageStats() {
  return { ...apiUsageCounter };
}

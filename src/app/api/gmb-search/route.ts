import { NextRequest, NextResponse } from 'next/server';
// import { rateLimit } from '../utils/rateLimit'; // Temporarily commented out for debugging
import { getCacheItem, setCacheItem, trackApiUsage } from '../utils/cache';

// Define types for Google Places API responses
interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings?: Array<{
    length: number;
    offset: number;
  }>;
  secondary_text: string;
}

interface Prediction {
  description: string;
  place_id: string;
  structured_formatting: StructuredFormatting;
  terms: Array<{
    offset: number;
    value: string;
  }>;
  types: string[];
  matched_substrings: Array<{
    length: number;
    offset: number;
  }>;
}

interface PlacesAutocompleteResponse {
  predictions: Prediction[];
  status: string;
}

interface GmbLocation {
  id: string;
  name: string;
  address: string;
  placeId: string;
}

// Google Places API endpoint
const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

export async function GET(request: NextRequest) {
  try {
    // Temporarily disable rate limiting to debug cross-browser issues
    // const rateLimited = rateLimit(request, 60);
    // if (rateLimited) return rateLimited;    // Get query parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const country = searchParams.get('country'); // Optional country filter
    
    // Log request info for debugging
    const userAgent = request.headers.get('user-agent') || 'unknown';
    console.log('GMB Search API called with query:', query, 'country:', country);
    console.log('User Agent:', userAgent);
    
    if (!query) {
      return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }

    // Check cache first - include country in cache key if provided
    const cacheKey = `gmb-search-query:${query}${country ? `-country:${country}` : ''}`;
    const cachedResults = getCacheItem<{ results: GmbLocation[] }>(cacheKey);
    
    if (cachedResults) {
      console.log('Returning cached results for query:', query);
      return NextResponse.json(cachedResults);
    }

    // Get API key from environment variables
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
      console.error('Google Maps API key is not configured');
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 }
      );
    }

    // Check API usage limit (daily limit of 1000 requests)
    const withinLimit = trackApiUsage('gmb_search', 1000);
    if (!withinLimit) {
      return NextResponse.json(
        { error: 'Daily API usage limit exceeded. Please try again tomorrow.' },
        { status: 429 }
      );
    }

    // First try to search for Polish businesses only
    let apiUrl = `${PLACES_API_URL}?input=${encodeURIComponent(query)}&types=establishment&language=pl&key=${apiKey}`;
    
    // If country is specified, use it; otherwise restrict to Poland first
    if (country) {
      apiUrl += `&components=country:${country}`;
    } else {
      apiUrl += '&components=country:pl';
    }
    
    let response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    let data = await response.json() as PlacesAutocompleteResponse;
    
    // If no Polish results found and no specific country was requested, search globally
    if (!country && (!data.predictions || data.predictions.length === 0)) {
      console.log('No Polish results found, searching globally for query:', query);
      
      // Search globally without country restriction
      const globalApiUrl = `${PLACES_API_URL}?input=${encodeURIComponent(query)}&types=establishment&language=pl&key=${apiKey}`;
      
      response = await fetch(globalApiUrl);
      
      if (!response.ok) {
        throw new Error(`Google API error (global search): ${response.status}`);
      }
      
      data = await response.json() as PlacesAutocompleteResponse;
    }    // Transform the data to the format expected by the frontend
    const results: GmbLocation[] = data.predictions.map((prediction, index) => ({
      id: `gmb-${index}-${prediction.place_id}`,
      name: prediction.structured_formatting?.main_text || prediction.description,
      address: prediction.structured_formatting?.secondary_text || '',
      placeId: prediction.place_id
    }));    // Cache the results for 1 hour (3600000 ms)
    const responseData = { results };
    setCacheItem(cacheKey, responseData, 3600000);

    // Return response with cache control headers to prevent browser caching issues
    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('GMB Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GMB locations' },
      { status: 500 }
    );
  }
}
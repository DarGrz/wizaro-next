import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../utils/rateLimit';
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
    // Apply rate limiting (10 requests per minute)
    const rateLimited = rateLimit(request, 10);
    if (rateLimited) return rateLimited;

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    
    if (!query) {
      return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }

    // Check cache first
    const cacheKey = `gmb-search:${query}`;
    const cachedResults = getCacheItem<{ results: GmbLocation[] }>(cacheKey);
    
    if (cachedResults) {
      // Return cached results
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

    // Call Google Places API
    const response = await fetch(
      `${PLACES_API_URL}?input=${encodeURIComponent(query)}&types=establishment&language=pl&components=country:pl&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json() as PlacesAutocompleteResponse;    // Transform the data to the format expected by the frontend
    const results: GmbLocation[] = data.predictions.map((prediction, index) => ({
      id: `gmb-${index}-${prediction.place_id}`,
      name: prediction.structured_formatting?.main_text || prediction.description,
      address: prediction.structured_formatting?.secondary_text || '',
      placeId: prediction.place_id
    }));

    // Cache the results for 1 hour (3600000 ms)
    const responseData = { results };
    setCacheItem(cacheKey, responseData, 3600000);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('GMB Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GMB locations' },
      { status: 500 }
    );
  }
}

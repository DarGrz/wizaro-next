import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../utils/rateLimit';
import { getCacheItem, setCacheItem, trackApiUsage } from '../utils/cache';

// Define interfaces for the Google Places API response
interface PlaceDetailsResponse {
  result: {
    name: string;
    formatted_address: string;
    formatted_phone_number?: string;
    website?: string;
    url: string; // Google Maps URL
    photos?: Array<{
      photo_reference: string;
      height: number;
      width: number;
    }>;
    business_status?: string;
    types?: string[];
    rating?: number;
    user_ratings_total?: number;
  };
  status: string;
}

interface PlaceDetails {
  id: string;
  name: string;
  address: string;
  phoneNumber?: string;
  website?: string;
  googleMapsUrl: string;
  photos: string[];
  businessStatus?: string;
  types?: string[];
  rating?: number;
  user_ratings_total?: number;
}

// Google Places API endpoint
const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting (10 requests per minute)
    const rateLimited = rateLimit(request, 10);
    if (rateLimited) return rateLimited;

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get('placeId');
    
    if (!placeId) {
      return NextResponse.json({ error: 'Missing placeId parameter' }, { status: 400 });
    }

    // Check cache first
    const cacheKey = `places-details:${placeId}`;
    const cachedDetails = getCacheItem<{ details: PlaceDetails }>(cacheKey);
    
    if (cachedDetails) {
      // Return cached results
      return NextResponse.json(cachedDetails);
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
    const withinLimit = trackApiUsage('places_details', 1000);
    if (!withinLimit) {
      return NextResponse.json(
        { error: 'Daily API usage limit exceeded. Please try again tomorrow.' },
        { status: 429 }
      );
    }

    // Specify fields to return (to reduce response size and API costs)
    const fields = [
      'name', 
      'formatted_address', 
      'formatted_phone_number', 
      'website', 
      'url', 
      'photos', 
      'business_status', 
      'types', 
      'rating',
      'user_ratings_total'
    ].join(',');

    // Call Google Places API
    const response = await fetch(
      `${PLACES_API_URL}?place_id=${placeId}&fields=${fields}&language=pl&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json() as PlaceDetailsResponse;
    
    if (data.status !== 'OK') {
      throw new Error(`Google Places API returned status: ${data.status}`);
    }

    // Transform photos to URLs
    const photoUrls = data.result.photos 
      ? data.result.photos.map(photo => 
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${apiKey}`
        )
      : [];    // Transform the data
    const details: PlaceDetails = {
      id: placeId,
      name: data.result.name,
      address: data.result.formatted_address,
      phoneNumber: data.result.formatted_phone_number,
      website: data.result.website,
      googleMapsUrl: data.result.url,
      photos: photoUrls,
      businessStatus: data.result.business_status,
      types: data.result.types,
      rating: data.result.rating,
      user_ratings_total: data.result.user_ratings_total
    };

    // Cache the results for 1 day (86400000 ms)
    const responseData = { details };
    setCacheItem(cacheKey, responseData, 86400000);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Places Details API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch place details' },
      { status: 500 }
    );
  }
}

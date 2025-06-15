import { NextRequest, NextResponse } from 'next/server';

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

interface TransformedPrediction {
  place_id: string;
  name: string;
  formatted_address: string;
}

// Google Places API endpoint
const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    
    if (!query) {
      return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
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

    // Call Google Places API
    const response = await fetch(
      `${PLACES_API_URL}?input=${encodeURIComponent(query)}&types=establishment&language=pl&components=country:pl&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json() as PlacesAutocompleteResponse;

    // Transform the data to get what we need
    const predictions: TransformedPrediction[] = data.predictions.map((prediction) => ({
      place_id: prediction.place_id,
      name: prediction.structured_formatting?.main_text || prediction.description,
      formatted_address: prediction.structured_formatting?.secondary_text || '',
    }));

    return NextResponse.json({ predictions });
  } catch (error) {
    console.error('Places API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch places data' },
      { status: 500 }
    );
  }
}

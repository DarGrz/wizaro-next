import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Get request IP address
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Parse the request body
    const { 
      name, 
      address,
      placeId, 
      phoneNumber, 
      website, 
      googleMapsUrl,
      businessStatus,
      rating,
      types
    } = await request.json();

    // Create Supabase client
    const supabase = createServerSupabaseClient();

    // Insert the searched GMB data
    const { data, error } = await supabase
      .from('searched_gmb')
      .insert({
        name,
        address,
        place_id: placeId,
        phone_number: phoneNumber || null,
        website: website || null,
        google_maps_url: googleMapsUrl,
        business_status: businessStatus || null,
        rating: rating || null,
        types: types || null,
        ip_address: ip,
        user_agent: request.headers.get('user-agent') || 'unknown'
      })
      .select();

    if (error) {
      console.error('Error saving searched GMB data:', error);
      return NextResponse.json(
        { error: 'Failed to save searched GMB data' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

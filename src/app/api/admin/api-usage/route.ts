import { NextRequest, NextResponse } from 'next/server';
import { getApiUsageStats } from '../../utils/cache';

export async function GET(request: NextRequest) {
  try {
    // Simple authentication - use a proper auth system in production
    const { searchParams } = new URL(request.url);
    const apiKey = searchParams.get('key');
    
    // Check if API key is provided and matches the expected value
    // In production, use a proper authentication system
    const adminApiKey = process.env.ADMIN_API_KEY;
    
    if (!apiKey || apiKey !== adminApiKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get API usage statistics
    const stats = getApiUsageStats();
    
    return NextResponse.json({
      success: true,
      data: {
        ...stats,
        message: 'Google Places API usage statistics'
      }
    });
  } catch (error) {
    console.error('API Usage Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch API usage statistics' },
      { status: 500 }
    );
  }
}

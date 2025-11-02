import { NextResponse } from 'next/server';
import { PRODUCTS, type Product } from '@/app/constants/products';

function getBaseUrl(req: Request) {
  // Próba odczytu pełnego URL-a z nagłówków (działa na Vercel / reverse proxy)
  const proto = req.headers.get('x-forwarded-proto') || 'http';
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'localhost:3000';
  return `${proto}://${host}`;
}

export async function GET(req: Request) {
  const baseUrl = getBaseUrl(req);

  const items = PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    shortDescription: p.shortDescription,
    description: p.description,
    categories: p.categories,
    pricing: p.pricing,
    availability: p.availability,
    sku: p.sku,
    tags: p.tags,
    deliveryEstimate: p.deliveryEstimate,
    image: p.image ? new URL(p.image, baseUrl).toString() : undefined,
    urls: {
      details: new URL(p.urls.details, baseUrl).toString(),
      buy: p.urls.buy ? new URL(p.urls.buy, baseUrl).toString() : undefined,
    },
  } satisfies Product));

  return NextResponse.json(
    {
      version: '1.0',
      currencyDefault: 'PLN',
      merchant: {
        name: 'Wizaro',
        baseUrl,
      },
      products: items,
      generatedAt: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // First get the document
    const { data: document, error: documentError } = await supabase
      .from('documents')
      .select(`
        *,
        company: companies (
          id,
          name,
          first_name,
          last_name,
          email,
          nip,
          phone,
          street,
          city,
          zip
        )
      `)
      .eq('id', params.id)
      .single();

    if (documentError) {
      console.error('❌ Error fetching document:', documentError);
      return NextResponse.json({ error: 'Error fetching document' }, { status: 500 });
    }

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Then get related reviews or profile removals based on document type
    if (document.type === 'żądanie usunięcia opinii') {
      const { data: reviews, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('document_id', params.id);

      if (reviewsError) {
        console.error('❌ Error fetching reviews:', reviewsError);
        return NextResponse.json({ error: 'Error fetching reviews' }, { status: 500 });
      }

      return NextResponse.json({
        ...document,
        reviews: reviews || []
      });
    } else if (document.type === 'żądanie usunięcia profilu') {
      const { data: removals, error: removalsError } = await supabase
        .from('profile_removals')
        .select('*')
        .eq('document_id', params.id);

      if (removalsError) {
        console.error('❌ Error fetching profile removals:', removalsError);
        return NextResponse.json({ error: 'Error fetching profile removals' }, { status: 500 });
      }

      return NextResponse.json({
        ...document,
        profile_removals: removals || []
      });
    }

    return NextResponse.json(document);
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
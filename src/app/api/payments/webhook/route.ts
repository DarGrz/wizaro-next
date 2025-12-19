import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('✅ Payment successful for session:', session.id);
        console.log('📦 Session metadata:', session.metadata);

        // Aktualizuj status dokumentu na 'paid' w bazie danych
        if (session.metadata?.document_id) {
          const { error } = await supabase
            .from('documents')
            .update({ 
              status: 'paid',
              stripe_session_id: session.id,
              payment_date: new Date().toISOString()
            })
            .eq('id', session.metadata.document_id);

          if (error) {
            console.error('❌ Error updating document status:', error);
          } else {
            console.log('✅ Document status updated to paid');
          }
        }

        // Wyślij email z potwierdzeniem zamówienia po udanej płatności
        // Obsługuje zarówno document_id (RODO) jak i order_id (quick payment)
        const documentId = session.metadata?.document_id;
        const orderId = session.metadata?.order_id;
        
        if (documentId || orderId) {
          try {
            console.log('📧 Przygotowanie emaila z potwierdzeniem zamówienia...');
            
            // Pobierz dane zamówienia z bazy
            const queryId = documentId || orderId;
            const { data: document, error: docError } = await supabase
              .from('documents')
              .select('*, companies(*)')
              .eq('id', queryId)
              .single();

            if (docError || !document) {
              console.error('❌ Błąd pobierania dokumentu:', docError);
            } else if (document.companies) {
              // Przygotuj wspólne dane firmy
              const company = {
                name: document.companies.name,
                first_name: document.companies.first_name,
                last_name: document.companies.last_name,
                email: document.companies.email,
                phone: document.companies.phone,
                nip: document.companies.nip,
                street: document.companies.street,
                city: document.companies.city,
                zip: document.companies.zip,
                url: document.companies.url,
              };

              const totalPrice = document.companies.price || 0;
              console.log('📧 Wysyłanie emaila z potwierdzeniem do:', company.email);
              console.log('📋 Typ dokumentu:', document.type);

              // Sprawdź typ dokumentu i wyślij odpowiedni email
              if (document.type === 'żądanie usunięcia opinii') {
                // Pobierz opinie powiązane z dokumentem
                const { data: reviews, error: reviewsError } = await supabase
                  .from('reviews')
                  .select('*')
                  .eq('document_id', queryId);

                if (reviewsError) {
                  console.error('❌ Błąd pobierania opinii:', reviewsError);
                } else if (reviews && reviews.length > 0) {
                  // Wyślij email dla usuwania opinii
                  const emailRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-order-confirmation`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      company,
                      reviews,
                      totalPrice,
                      orderId: queryId,
                    }),
                  });

                  if (emailRes.ok) {
                    console.log('✅ Email z potwierdzeniem opinii wysłany pomyślnie po płatności');
                  } else {
                    const errorText = await emailRes.text();
                    console.error('⚠️ Nie udało się wysłać emaila z potwierdzeniem opinii:', errorText);
                  }
                }
              } else if (document.type === 'żądanie usunięcia profilu') {
                // Pobierz profile removals powiązane z dokumentem
                const { data: profiles, error: profilesError } = await supabase
                  .from('profile_removals')
                  .select('*')
                  .eq('document_id', queryId);

                if (profilesError) {
                  console.error('❌ Błąd pobierania profili:', profilesError);
                } else if (profiles && profiles.length > 0) {
                  // Wyślij email dla usuwania profili
                  const emailRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-profile-confirmation`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      company,
                      profiles,
                      totalPrice,
                      orderId: queryId,
                    }),
                  });

                  if (emailRes.ok) {
                    console.log('✅ Email z potwierdzeniem profili wysłany pomyślnie po płatności');
                  } else {
                    const errorText = await emailRes.text();
                    console.error('⚠️ Nie udało się wysłać emaila z potwierdzeniem profili:', errorText);
                  }
                }
              } else {
                console.log('ℹ️ Nieznany typ dokumentu lub płatność bez opinii/profili (quick payment)');
              }
            }
          } catch (emailError) {
            console.error('❌ Błąd wysyłki emaila z potwierdzeniem:', emailError);
            // Nie przerywamy procesu webhooka - email to dodatkowa funkcja
          }
        }
        
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('❌ Payment failed for intent:', paymentIntent.id);
        break;
      }

      default:
        console.log('ℹ️ Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);


// Next.js expects params as a Promise in app directory types
type EditOrderPageProps = { params: Promise<{ id: string }> };

export default async function EditOrderPage({ params }: EditOrderPageProps) {
  const { id } = await params;
  // Auth check
  const isLoggedIn = (await cookies()).get('admin-auth')?.value === 'true';
  if (!isLoggedIn) redirect('/login');

  // Fetch order
  const { data: order } = await supabase
    .from('documents')
    .select(`*, companies (*), payments (*)`)
    .eq('id', id)
    .single();

  if (!order) redirect('/dashboard/orders');

  // Handle form submit (server action)
  async function updateOrder(formData: FormData) {
    'use server';
    
    // Create an object with the fields to update
    const updates: Record<string, unknown> = {
      type: formData.get('type'),
      processing_status: formData.get('processing_status'),
      invoice_url: formData.get('invoice_url'),
      payment_url: formData.get('payment_url'),
      // Ensure tracking_token is preserved by not updating it
    };
    
    // Remove empty fields to avoid overwriting with empty values
    Object.keys(updates).forEach(key => {
      if (updates[key] === '' || updates[key] === null) {
        delete updates[key];
      }
    });
    
    // Update document
    await supabase.from('documents').update(updates).eq('id', id);
    
    // Update payment status if provided
    const paymentStatus = formData.get('payment_status');
    if (paymentStatus) {
      await supabase
        .from('payments')
        .update({ status: paymentStatus })
        .eq('document_id', id);
    }
    
    redirect(`/dashboard/orders/${id}`);
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edytuj zamówienie #{order.id}</h1>
        <Link href={`/dashboard/orders/${order.id}`} className="text-blue-700 underline">Powrót</Link>
      </div>
      <form action={updateOrder} className="space-y-6 bg-white shadow rounded-xl p-6">
        <div>
          <label className="block text-sm font-medium mb-1">Typ zamówienia</label>
          <input
            name="type"
            defaultValue={order.type}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status płatności</label>
          <select
            name="payment_status"
            defaultValue={order.payments?.[0]?.status || ''}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Brak</option>
            <option value="pending">Oczekuje</option>
            <option value="paid">Opłacone</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status realizacji</label>
          <select
            name="processing_status"
            defaultValue={order.processing_status || 'nowe'}
            className="w-full border rounded px-3 py-2"
          >
            <option value="nowe">Nowe</option>
            <option value="w trakcie">W trakcie realizacji</option>
            <option value="zakończone">Zakończone</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Link do faktury</label>
          <input
            name="invoice_url"
            defaultValue={order.invoice_url || ''}
            placeholder="https://example.com/faktura.pdf"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Link do płatności</label>
          <input
            name="payment_url"
            defaultValue={order.payment_url || ''}
            placeholder="https://pay.example.com/payment"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-[#002a5c] text-white px-6 py-2 rounded hover:bg-[#001e47]"
        >
          Zapisz zmiany
        </button>
      </form>
    </main>
  );
}

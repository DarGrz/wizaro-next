"use client";
import React from "react";

export default function DeleteOrderButton({ orderId }: { orderId: string }) {
  function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    if (!confirm("Na pewno usunąć to zamówienie?")) {
      e.preventDefault();
    }
  }
  return (
    <form
      action={"/dashboard/orders/[id]/edit?deleteOrder=1"}
      method="post"
      onSubmit={handleDelete}
      className="mt-4"
    >
      <input type="hidden" name="order_id" value={orderId} />
      <button
        type="submit"
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-800"
      >
        Usuń zamówienie
      </button>
    </form>
  );
}

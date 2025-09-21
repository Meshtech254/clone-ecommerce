"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function DonatePage() {
  const [amount, setAmount] = useState(25);
  const [loading, setLoading] = useState(false);

  const startCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (!res.ok) throw new Error("Failed to create checkout");
      const { sessionId } = await res.json();
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");
      await stripe.redirectToCheckout({ sessionId });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Donate</h1>
      <p className="mt-2 text-sm text-[color:var(--foreground)]/80">Your support helps us expand our impact.</p>
      <div className="mt-6 space-y-4">
        <input
          type="number"
          min={1}
          step={1}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full rounded-md border px-3 py-2 bg-transparent"
        />
        <button onClick={startCheckout} disabled={loading} className="rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">
          {loading ? "Processing..." : "Donate"}
        </button>
      </div>
    </div>
  );
}


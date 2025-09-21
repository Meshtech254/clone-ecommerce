import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/src/lib/stripe";
import { createSupabaseServerClient } from "@/src/lib/supabase/server";

export async function POST(request: NextRequest) {
  const { amount } = await request.json();
  const stripe = getStripe();
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Donation to EDB Foundation" },
          unit_amount: Math.round(Number(amount) * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate?status=cancelled`,
    metadata: {
      user_id: user?.id ?? "anon",
    },
  });

  return NextResponse.json({ sessionId: session.id });
}


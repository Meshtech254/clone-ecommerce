import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY as string;
  return new Stripe(key, { apiVersion: "2024-06-20" } as any);
}


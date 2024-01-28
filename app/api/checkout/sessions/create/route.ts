import { CreateCheckOutSessionRequest, ICreateCheckoutSession } from "@/models/customRequests";
import { NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET);

export async function POST(request: CreateCheckOutSessionRequest) {
  const body: ICreateCheckoutSession = await request.json(),
    { checkOutProducts, userCheckoutId } = body

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: checkOutProducts,
      mode: 'payment',
      client_reference_id: userCheckoutId,
      ui_mode: "embedded",
      return_url: `http://localhost:3000/receipt/{CHECKOUT_SESSION_ID}`
    });

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (error) {
    console.log(error)
  }
}

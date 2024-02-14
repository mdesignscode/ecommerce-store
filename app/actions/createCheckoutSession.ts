"use server"

const stripe = require('stripe')(process.env.STRIPE_SECRET);

export interface ICheckOutProduct {
  price: string;
  quantity: number;
}

export interface ICreateCheckoutSession {
  checkoutProducts: ICheckOutProduct[],
  userCheckoutId: string | undefined | null,
}

export async function createCheckoutSession({ checkoutProducts, userCheckoutId }: ICreateCheckoutSession): Promise<string | { error: string }> {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: checkoutProducts,
      mode: 'payment',
      client_reference_id: userCheckoutId,
      ui_mode: "embedded",
      return_url: `http://localhost:3000/receipt/{CHECKOUT_SESSION_ID}`
    });

    return session.client_secret
  } catch (error: any) {
    return { error: error.message }
  }
}

"use server"

import prisma from "@/lib/prisma";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

const stripe = require('stripe')(process.env.STRIPE_SECRET);

export async function createCheckoutUser(): Promise<TUser> {
  const user = await currentUser()

  if (!user) return redirectToSignIn({ returnBackUrl: "/checkout" })

  const customer = await stripe.customers.create({
    email: user.emailAddresses[0].emailAddress
  });

  return await prisma.user.update({
    where: { id: user.id },
    data: { checkoutId: customer.id },
    include: {
      purchaseHistory: { include: { products: true } },
      shoppingCart: { include: { products: true } },
      wishList: { include: { products: true } },
    }
  })
}

import prisma from "@/lib/prisma";
import { CreateCheckOutUserRequest, ICreateCheckoutUser } from "@/models/customRequests";
import { NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET);

export async function POST(request: CreateCheckOutUserRequest) {
  const body: ICreateCheckoutUser = await request.json(),
    { email, userId } = body

  const customer = await stripe.customers.create({
    email
  });

  const user = await prisma.user.update({
    where: { id: userId },
    data: { checkoutId: customer.id }
  })

  return NextResponse.json(user)
}

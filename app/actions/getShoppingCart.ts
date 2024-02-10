"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export async function getShopingCart() {
  // get signed in user
  const user = await currentUser()
  if (!user) return null

  const customer = await prisma.user.findUnique({
    where: { id: user.id }
  })
  if (!customer || !customer?.shoppingCartId) return null

  const userShoppingCart = await prisma.shoppingCart.findUnique({
    where: {
      id: customer.shoppingCartId
    },
    include: {
      products: true
    }
  })

  if (!userShoppingCart) return null

  const shoppingCartItems = userShoppingCart.products.map(async (product) => prisma.product.findUnique({
    where: { id: product.productId },
    include: {
      images: true,
      price: true
    }
  }))

  return await Promise.all(shoppingCartItems)
}

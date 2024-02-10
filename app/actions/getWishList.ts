"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export async function getWishList() {
  // get signed in user
  const user = await currentUser()
  if (!user) return null

  const customer = await prisma.user.findUnique({
    where: { id: user.id }
  })
  if (!customer || !customer?.wishListId) return null

  const userWishList = await prisma.wishList.findUnique({
    where: {
      id: customer.wishListId
    },
    include: {
      products: true
    }
  })

  if (!userWishList) return null

  const wishListItems = userWishList.products.map(async (product) => prisma.product.findUnique({
    where: { id: product.productId },
    include: {
      images: true,
      price: true
    }
  }))

  return await Promise.all(wishListItems)
}

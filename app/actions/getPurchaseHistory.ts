"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export async function getPurchaseHistory() {
  // get signed in user
  const user = await currentUser()
  if (!user) return null

  const customer = await prisma.user.findUnique({
    where: { id: user.id }
  })
  if (!customer || !customer?.purchaseHistoryId) return null

  const userPurchaseHistory = await prisma.purchaseHistory.findUnique({
    where: {
      id: customer.purchaseHistoryId
    },
    include: {
      products: true
    }
  })

  if (!userPurchaseHistory) return null

  const purchaseHistoryItems = userPurchaseHistory.products.map(async (product) => prisma.product.findUnique({
    where: { id: product.productId },
    include: {
      images: true,
      price: true
    }
  }))

  return await Promise.all(purchaseHistoryItems)
}

"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { TProduct } from "../Components/ProductsGroup";

export interface IPurchasedItem {
  id: number;
  createdAt: Date;
  quantity: number;
  product: TProduct;
}

export async function getPurchaseHistory(): Promise<Record<string, IPurchasedItem[]> | null> {
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

  const groupedPurchases = await prisma.purchasedItem.groupBy({
    by: ["createdAt"],
    where: { purchaseHistoryId: customer.purchaseHistoryId },
    orderBy: {
      createdAt: "asc"
    }
  })

  const purchasesByDate: Record<string, IPurchasedItem[]> = {}

  await Promise.all(groupedPurchases.map(async group => {
    // get purchased items
    const purchases = await prisma.purchasedItem.findMany({
      where: {
        createdAt: group.createdAt,
        purchaseHistoryId: customer.purchaseHistoryId,
      }
    })

    const purchasedItems: IPurchasedItem[] = await Promise.all(purchases.map(async item => {
      // get product
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { price: true, images: true }
      })

      return {
        createdAt: item.createdAt,
        id: item.id,
        quantity: item.quantity,
        product
      } as IPurchasedItem
    }))

    purchasesByDate[group.createdAt.toDateString()] = purchasedItems
  }))

  return purchasesByDate
}

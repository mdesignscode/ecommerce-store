"use server"

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { IReceiptObject } from "../../page";

export async function handleProductsPurchase(purchasedItems: IReceiptObject[]): Promise<void> {
  // there must be a user associated with request
  const user = await currentUser()
  if (!user) return;

  const customer = await prisma.user.findUnique({
    where: { id: user.id },
    include: { shoppingCart: { include: { products: true } } }
  })

  // if shopping cart empty, request was made through reload
  if (!customer || !customer.shoppingCart?.products.length) return;

  const productIds: { productId: string, quantity: number }[] = []

  for (const item of purchasedItems) {
    // get product by title
    const products = await prisma.product.findMany({
      where: {
        title: item.name
      }
    })

    // update stock count for product
    const updateProduct = await prisma.product.update({
      where: { id: products[0].id },
      data: {
        stock: products[0].stock - item.quantity,
      }
    })

    productIds.push({ productId: updateProduct.id, quantity: item.quantity })
  }

  // create new purchase history record for first time purchase
  if (!customer.purchaseHistoryId) {
    await prisma.user.update({
      where: { id: customer.id },
      data: {
        purchaseHistory: {
          create: {
            products: {
              create: productIds
            }
          }
        }
      }
    })
  } else {
    // add items to existing list
    await prisma.purchaseHistory.update({
      where: { id: customer.purchaseHistoryId },
      data: { products: { create: productIds } }
    })
  }

  if (!customer.shoppingCartId) return;

  // remove product from shopping cart
  await prisma.shoppingCart.update({
    where: {
      id: customer.shoppingCartId,
    },
    data: {
      products: {
        deleteMany: productIds.map(i => ({ productId: i.productId }))
      }
    }
  })
}

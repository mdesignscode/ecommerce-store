"use server"

import prisma from "@/lib/prisma"

export async function editAttribute(productId: string | undefined, { key, value }: { key: string, value: string | number }) {
  console.log(await prisma.product.update({
    where: { id: productId },
    data: key === "price" ? {
      price: {
        update: {
          data: {
            amount: value as number
          }
        }
      }
    } : {
      [key]: value
    }
  }))
}

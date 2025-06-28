"use server"

import prisma from "@/lib/prisma";
import { Prisma, PrismaPromise } from "@prisma/client";

export async function getProductsByCategories(groupedProducts: (Prisma.PickEnumerable<Prisma.ProductGroupByOutputType, "category"[]> & {})[]) {
  const productsByCategories: Record<string, PrismaPromise<TProduct[]>> = {}

  groupedProducts.forEach(({ category }) => {
    productsByCategories[category] = prisma.product.findMany({
      where: {
        category,
      },
      include: {
        images: true,
        price: true,
      },
      take: 5,
    })
  })

  return productsByCategories
}


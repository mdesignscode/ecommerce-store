'use server';

import prisma from "@/lib/prisma";

export async function getDiscountedProductsAndCategories() {
  const groupedProducts = await prisma.product.groupBy({
    by: ["category"],
    orderBy: {
      category: "asc",
    },
  }),
    discountedProducts = await prisma.product.findMany({
      include: { images: true, price: true },
      where: {
        discountPercentage: {
          not: null,
        },
      },
      take: 5
    })

  return { groupedProducts, discountedProducts }
}

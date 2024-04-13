"use server";

import prisma from "@/lib/prisma";

export async function getCategoryProducts(category: string) {
  return prisma.product.findMany({
    include: { images: true, price: true },
    where: {
      category,
    },
    take: 4,
  });
}

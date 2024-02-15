import prisma from "@/lib/prisma";

export async function deleteProduct(product: TProduct) {
  await prisma.product.delete({
    where: {
      id: product?.id
    }
  })
}

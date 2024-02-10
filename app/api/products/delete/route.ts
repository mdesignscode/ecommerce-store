import prisma from "@/lib/prisma";
import { DeleteProduct, IDeleteProduct } from "@/models/customRequests";

export async function POST(request: DeleteProduct) {
  const body: IDeleteProduct = await request.json(),
    { product } = body

  await prisma.product.delete({
    where: {
      id: product?.id
    }
  })

  return new Response("Product deleted", { status: 201 })
}

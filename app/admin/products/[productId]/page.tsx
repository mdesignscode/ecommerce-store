import prisma from "@/lib/prisma";
import ProductPage from "./Components/ProductPage";

export default async function Page({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const product = await prisma.product.findUnique({
      include: { images: true, price: true },
      where: {
        id: productId,
      },
    }),
    categories = await prisma.product.groupBy({
      by: ["category"],
      orderBy: {
        category: "asc",
      },
    });

  if (!product) {
    return <p>Product not found</p>;
  }

  return <ProductPage categories={categories.map(c => c.category)} product={product} />;
}

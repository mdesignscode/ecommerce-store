import prisma from "@/lib/prisma";
import ProductsGroup from "./ProductsGroup";

export default async function DiscountedProducts() {
  const discountedProducts = prisma.product.findMany({
    include: { images: true, price: true },
    where: {
      discountPercentage: {
        not: null,
      },
    },
    take: 5,
  });

  return (
    <ProductsGroup
      products={discountedProducts}
      groupTitle="Discounted Products"
      groupUrl="discountedProducts"
      key="discountedProducts"
    />
  );
}

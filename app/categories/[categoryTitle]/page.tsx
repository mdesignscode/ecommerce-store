import Product from "@/app/Components/Product";
import { capitalizeAndReplace } from "@/app/page";
import prisma from "@/lib/prisma";

export default async function Page({
  params: { categoryTitle },
}: {
  params: { categoryTitle: string };
}) {
  const isDiscountedProducts = categoryTitle === "discountedProducts",
    categoryProducts = await prisma.product.findMany({
      include: { images: true },
      where: isDiscountedProducts
        ? {
            discountPercentage: {
              not: null,
            },
          }
        : { category: categoryTitle },
    });

  return (
    <main className="flex flex-col py-4 items-center">
      <h1 className="text-xl font-bold">
        All{" "}
        {isDiscountedProducts
          ? "Discounted"
          : capitalizeAndReplace(categoryTitle)}{" "}
        Products
      </h1>
      {categoryProducts.map((product) => (
        <Product
          key={product.id}
          styles="w-2/3 border-dark border-2"
          product={product}
        />
      ))}
    </main>
  );
}

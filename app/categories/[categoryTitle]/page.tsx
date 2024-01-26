import Product from "@/app/Components/Product";
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
      <section>
        {categoryProducts.map((product) => (
          <Product
            key={product.id}
            styles="border-dark border-2"
            product={product}
          />
        ))}
      </section>
    </main>
  );
}

function capitalizeAndReplace(str: string) {
  // Split the string by hyphens, capitalize each word, and join them with spaces
  const formattedString = str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedString;
}

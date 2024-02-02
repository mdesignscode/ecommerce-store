import FadeIn from "@/app/Components/FadeIn";
import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";

const Product = dynamic(() => import("@/components/Product"));

export default async function Page({
  params: { categoryTitle },
}: {
  params: { categoryTitle: string };
}) {
  const decodedTitle = decodeURI(categoryTitle),
    isDiscountedProducts = decodedTitle === "discountedProducts",
    categoryProducts = await prisma.product.findMany({
      include: { images: true, price: true },
      where: isDiscountedProducts
        ? {
            discountPercentage: {
              not: null,
            },
          }
        : { category: decodedTitle },
    });

  return (
    <main className="flex flex-col items-center p-4 gap-2">
      <h1 className="text-xl font-bold md:text-2xl">
        All{" "}
        {isDiscountedProducts
          ? "Discounted"
          : capitalizeAndReplace(decodedTitle)}{" "}
        Products
      </h1>
      <section className="md:flex md:w-5/6 flex-wrap justify-center items-center">
        {categoryProducts.map((product) =>
          !product ? (
            <></>
          ) : (
            <FadeIn key={product.id}>
              <Product
                styles="border-dark border-2"
                product={product}
              />
            </FadeIn>
          )
        )}
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

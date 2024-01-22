import prisma from "@/lib/prisma";
import ProductsGroup from "./Components/ProductsGroup";

export default async function Home() {
  const discountedProducts = await prisma.product.findMany({
      include: { images: true },
      where: {
        discountPercentage: {
          not: null,
        },
      },
    }),
    groupedProducts = await prisma.product.groupBy({
      by: ["category"],
      orderBy: {
        category: "asc",
      },
    });

  return (
    <main className="flex flex-col gap-4 overflow-x-hidden">
      <ProductsGroup
        products={discountedProducts}
        groupTitle="Discounted Products"
        groupUrl="discountedProducts"
      />

      {groupedProducts.map(({ category }) => (
        <ProductsGroup
          key={category}
          groupTitle={capitalizeAndReplace(category)}
          groupUrl={category}
        />
      ))}
    </main>
  );
}

export function capitalizeAndReplace(str: string) {
  // Split the string by hyphens, capitalize each word, and join them with spaces
  const formattedString = str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedString;
}

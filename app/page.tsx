import prisma from "@/lib/prisma";
import ProductsGroup from "./Components/ProductsGroup";
import FadeIn from "./Components/FadeIn";

export default async function Home() {
  const discountedProducts = await prisma.product.findMany({
      include: { images: true, price: true },
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
    }),
    categoryComponents: JSX.Element[] = groupedProducts.map(({ category }) => (
      <ProductsGroup
        key={category}
        groupTitle={capitalizeAndReplace(category)}
        groupUrl={category}
      />
    )),
    productsList = [
      <ProductsGroup
        products={discountedProducts}
        groupTitle="Discounted Products"
        groupUrl="discountedProducts"
        key="discountedProducts"
      />,
    ];

  productsList.push(...categoryComponents);

  return (
    <main className="flex flex-col gap-4">
        <FadeIn>
          <ProductsGroup
            products={discountedProducts}
            groupTitle="Discounted Products"
            groupUrl="discountedProducts"
            key="discountedProducts"
          />
        </FadeIn>
        {groupedProducts.map(({ category }) => (
          <FadeIn key={category}>
            <ProductsGroup
              groupTitle={capitalizeAndReplace(category)}
              groupUrl={category}
            />
          </FadeIn>
        ))}
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

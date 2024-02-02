import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import DiscountedProducts from "./Components/DiscountedProducts";
import ProductsGroup from "./Components/ProductsGroup";
import ProductsGroupSkeleton from "./Components/Skeletons/ProductsGroup";

const FadeIn = dynamic(() => import("./Components/FadeIn"), { ssr: false });

export default async function Home() {
  const groupedProducts = await prisma.product.groupBy({
    by: ["category"],
    orderBy: {
      category: "asc",
    },
  });

  return (
    <main className="flex flex-col gap-4">
      <Suspense fallback={<ProductsGroupSkeleton />}>
        <DiscountedProducts />
      </Suspense>

      {groupedProducts.map(({ category }) => (
        <FadeIn key={category}>
          <Suspense fallback={<ProductsGroupSkeleton />}>
            <ProductsGroup
              groupTitle={capitalizeAndReplace(category)}
              groupUrl={category}
            />
          </Suspense>
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

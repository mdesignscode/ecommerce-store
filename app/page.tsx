import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import DiscountedProducts from "./Components/DiscountedProducts";
import ProductsGroup from "./Components/ProductsGroup";
import ProductsGroupSkeleton from "./Components/Skeletons/ProductsGroup";
import { capitalizeAndReplace } from "@/utils";

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

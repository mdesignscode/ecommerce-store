import Link from "next/link";
import { Suspense } from "react";
import ProductCategoriesSkeleton from "@/Skeletons/ProductCategories";
import ProductCategories from "./ProductCategories";

export default async function Header() {
  return (
    <header className="flex flex-col">
      <section className="flex justify-between p-2 text-light bg-dark">
        <Link href="/" className="text-xl font-bold">
          Dev Store.
        </Link>
      </section>

      <Suspense fallback={<ProductCategoriesSkeleton />}>
        <ProductCategories />
      </Suspense>
    </header>
  );
}

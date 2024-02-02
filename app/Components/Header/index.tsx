import Link from "next/link";
import ProductCategories from "./ProductCategories";
import CheckoutLink from "./CheckoutLink";
import ProductCategoriesSkeleton from "../Skeletons/ProductCategories";
import { Suspense } from "react";

export default async function Header() {
  return (
    <header className="flex flex-col">
      <section className="flex justify-between p-2 text-light bg-dark">
        <Link href="/" className="text-xl font-bold">
          Dev Store.
        </Link>

        <CheckoutLink />
      </section>

      <Suspense fallback={<ProductCategoriesSkeleton />}>
        <ProductCategories />
      </Suspense>
    </header>
  );
}

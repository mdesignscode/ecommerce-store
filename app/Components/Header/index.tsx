import Link from "next/link";
import ProductCategories from "./ProductCategories";
import prisma from "@/lib/prisma";
import CheckoutLink from "./CheckoutLink";

export default async function Header() {
  const categories = await prisma.product.groupBy({
    by: ["category"],
  });
  return (
    <header className="sticky top-0 z-20 flex flex-col">
      <section className="flex justify-between p-2 text-light bg-dark">
        <Link href="/" className="text-xl font-bold">
          Dev Store.
        </Link>

        <CheckoutLink />
      </section>
      <ProductCategories categories={categories} />
    </header>
  );
}

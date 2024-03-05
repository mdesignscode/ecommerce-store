"use client";

import Link from "next/link";
import Product from "./Product";
import ProductSkeleton from "./Skeletons/Product";

interface IProductsGroupProps {
  products: TProduct[] | null;
  groupTitle: string;
  groupUrl: string;
}

export default function ProductsGroup({
  products,
  groupUrl,
  groupTitle,
}: IProductsGroupProps) {
  return (
    <section className="w-full gap-2 flex flex-col bg-secondary p-2 items-start">
      <h2 className="font-bold md:text-xl">{groupTitle}</h2>

      <section className="flex overflow-x-auto w-full whitespace-nowrap snap-x">
        {products ? (
          <>
            {products.map((product) => (
              <Product key={product?.id} product={product} />
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 5 }).map((_, j) => (
              <ProductSkeleton key={j} />
            ))}
          </>
        )}
      </section>

      <Link
        href={"/categories/" + groupUrl}
        className="text-primary no-underline hover:underline underline-offset-2 md:text-lg"
      >
        View More {groupTitle}
      </Link>
    </section>
  );
}

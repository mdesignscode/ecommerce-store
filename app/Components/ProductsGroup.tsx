"use client";

import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import ProductSkeleton from "./Skeletons/Product";
import Image from "next/image";
import { getDiscountPrice } from "@/utils";
import ProductGroupContent from "./ProductGroupContent";

const Product = dynamic(() => import("./Product"));

interface IProductsGroupProps {
  products: TProduct[];
  groupTitle: string;
  groupUrl: string;
  category: string;
}

export default function ProductsGroup({
  products,
  groupUrl,
  groupTitle,
  category,
}: IProductsGroupProps) {
  return (
    <section className="w-full space-y-2 p-2 md:flex justify-center gap-8 items-center">
      <h2 className="font-bold md:text-xl md:[writing-mode:vertical-lr] md:rotate-180">
        {groupTitle}
      </h2>

      <section className="grid grid-cols-2 grid-rows-2 gap-2 md:gap-6 md:w-[60%]">
        {products.map((product) =>
          !product ? undefined : (
            <ProductGroupContent key={product.id} product={product} />
          )
        )}
      </section>

      <Link
        href={"/categories/" + groupUrl}
        className="text-primary no-underline hover:underline underline-offset-2 md:text-lg md:[writing-mode:vertical-lr]"
      >
        View all {category}
      </Link>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Prisma } from "@/prisma/generated/client";
import ProductsGroup from "./ProductsGroup";
import { ReactNode, useEffect, useState } from "react";
import { getCategoryProducts } from "../actions/getCategoryProducts";

export default function HomePage({
  groupedProducts,
  discountedProducts,
}: {
  groupedProducts: (Prisma.PickEnumerable<
    Prisma.ProductGroupByOutputType,
    "category"[]
  > & {})[];
  discountedProducts: TProduct[];
}) {
  const [categories, setCategories] = useState<TProduct[][]>([]);

  useEffect(() => {
    Promise.all(
      groupedProducts.map(async ({ category }) => {
        const categoryProducts = await getCategoryProducts(category);
        setCategories((s) => [...s, categoryProducts]);
      })
    );
  }, [groupedProducts]);

  return (
    <div className="">
      <div className="px-4 md space-y-4">
        <SlideIn>
          <ProductsGroup
            groupTitle="Browse our discounted products"
            groupUrl="/products/discounted"
            products={discountedProducts}
            category="discounted products"
          />
        </SlideIn>
        {categories.map(
          (products, i) =>
            !!groupedProducts[i] && (
              <SlideIn key={groupedProducts[i].category}>
                <ProductsGroup
                  groupTitle={`Browse products in ${groupedProducts[i].category}`}
                  groupUrl="/products/discounted"
                  products={products}
                  category={`products in ${groupedProducts[i].category}`}
                />
              </SlideIn>
            )
        )}
      </div>
    </div>
  );
}

function SlideIn({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { capitalizeAndReplace } from "@/utils";
import { useEffect, useState } from "react";
import FadeIn from "./Components/FadeIn";
import ProductsGroup from "./Components/ProductsGroup";
import { getDiscountedProductsAndCategories } from "./actions/getDiscountedProductsAndCategories";
import { getProductsByCategories } from "./actions/getProductsByCategories";

interface IAllProducts {
  byCategories: Record<string, TProduct[] | null>;
  discounted: TProduct[] | null;
}

export default function Home() {
  const [allProducts, setAllProducts] = useState<IAllProducts>({
    discounted: null,
    byCategories: {},
  });

  useEffect(() => {
    const setDiscountedProductsAndCategories = async () => {
      const { discountedProducts, groupedProducts } =
        await getDiscountedProductsAndCategories();

      setAllProducts({
        discounted: discountedProducts,
        byCategories: Object.fromEntries(
          groupedProducts.map(({ category }) => [category, null])
        ),
      });

      const productByCategories = await getProductsByCategories(
        groupedProducts
      );

      Object.keys(productByCategories).forEach((category) => {
        productByCategories[category].then((products) =>
          setAllProducts((state) => ({
            ...state,
            byCategories: {
              ...state.byCategories,
              [category]: products,
            },
          }))
        );
      });
    };

    setDiscountedProductsAndCategories();
  }, []);

  return (
    <main className="flex flex-col gap-4">
      <ProductsGroup
        products={allProducts.discounted}
        groupTitle="Discounted Products"
        groupUrl="discountedProducts"
        key="discountedProducts"
      />

      {Object.keys(allProducts.byCategories).map((category) => (
        <FadeIn key={category}>
          <ProductsGroup
            products={allProducts.byCategories[category]}
            groupTitle={capitalizeAndReplace(category)}
            groupUrl={category}
          />
        </FadeIn>
      ))}
    </main>
  );
}

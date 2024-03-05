"use client";

import ProductsGroup from "./ProductsGroup";

export default function DiscountedProducts({
  discountedProducts,
}: {
  discountedProducts: TProduct[] | null;
}) {
  return (
    <ProductsGroup
      products={discountedProducts}
      groupTitle="Discounted Products"
      groupUrl="discountedProducts"
      key="discountedProducts"
    />
  );
}

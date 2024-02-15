"use client";

import Product from "./Product";

export default function HomePage({ products }: { products: TProduct[] }) {
  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <h1 className="text-lg font-bold text-center my-2">All Products</h1>

      <div className="w-10/12 flex flex-col gap-2 mx-auto">
        {products.map((product) => (
          <Product product={product} key={product?.id} />
        ))}
      </div>
    </div>
  );
}

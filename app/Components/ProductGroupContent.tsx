"use client";

import { getDiscountPrice } from "@/utils";
import Image from "next/image";

export default function ProductGroupContent({
  product,
}: {
  product: NonNullable<TProduct>;
}) {
  return (
    <a
      href={`/products/${product.id}`}
      className="group relative"
    >
      <div className="relative aspect-video">
        <Image
          alt=""
          src={product.images[0].url}
          fill
          className="rounded-sm group-hover:blur-[2px] transition-all"
        />
      </div>

      <div className="invisible h-0 group-hover:h-full group-hover:visible transition-all absolute top-0 left-0 z-10 bg-black bg-opacity-80 w-full text-white rounded-sm p-1 lg:p-3">
        <strong>{product.title}</strong>
        {product.discountPercentage ? (
          <p className="space-x-4">
            <span className="line-through">${product.price.amount}</span>

            <span className="text-pink-600">
              $
              {getDiscountPrice(
                product.price.amount,
                product.discountPercentage
              )}
            </span>
          </p>
        ) : (
          <p>${product.price.amount}</p>
        )}

        <div className="hidden lg:block">
          <p className="my-1">{product.description}</p>

          <p>Items in stock: {product.stock}</p>
        </div>
      </div>
    </a>
  );
}

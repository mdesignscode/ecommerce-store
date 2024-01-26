"use client";

import classNames from "classnames";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TProduct } from "./ProductsGroup";

const AddToUserList = dynamic(() => import("./AddToUserList"));

interface IProductProps {
  product: TProduct;
  styles?: string;
  disableAddToWishList?: boolean;
  disableAddToShoppingCart?: boolean;
}

export default function Product({
  product,
  styles,
  disableAddToWishList,
  disableAddToShoppingCart,
}: IProductProps) {
  const router = useRouter();
  return (
    <section
      role="Navigation"
      aria-label={`Navigate to ${product.title}`}
      onClick={() => router.push("/products/" + product.id)}
      className={classNames(
        "bg-light flex flex-col w-60 md:w-72 hover:shadow-lg rounded-lg p-2 flex-none gap-2 transition-all hover:scale-105 m-3 cursor-pointer",
        styles
      )}
    >
      <p className="text-ellipsis overflow-hidden">{product.title}</p>

      <Image
        className={classNames("m-auto rounded-lg w-full")}
        src={product.images[0].url}
        alt="Preview of product"
        width={200}
        height={200}
      />

      <div className="flex gap-4 text-lg">
        <p>Price:</p>

        {product.discountPercentage ? (
          <>
            <p className="font-bold">
              ${Math.round(product.price * (product.discountPercentage / 100))}
            </p>
            <p className="line-through font-bold text-red-600">
              ${product.price}
            </p>
          </>
        ) : (
          <p className="font-bold">${product.price}</p>
        )}
      </div>

      <AddToUserList
        disableAddToShoppingCart={disableAddToShoppingCart}
        disableAddToWishList={disableAddToWishList}
        product={product}
      />
    </section>
  );
}

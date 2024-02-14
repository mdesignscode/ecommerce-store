"use client";

import classNames from "classnames";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getDiscountPrice } from "@/utils";
import { TagIcon } from "@heroicons/react/24/outline";

const AddToUserList = dynamic(() => import("./AddToUserList"), { ssr: false });

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
      tabIndex={0}
      role="complementary"
      aria-label={`Navigate to ${product?.title}`}
      onClick={() => router.push("/products/" + product?.id)}
      className={classNames(
        "bg-light flex flex-col w-60 md:w-72 hover:shadow-lg rounded-lg p-2 flex-none gap-2 transition-all hover:scale-105 m-3 cursor-pointer",
        styles
      )}
    >
      <p className="text-ellipsis overflow-hidden">{product?.title}</p>
      <Image
        className={classNames("m-auto rounded-lg w-full h-auto")}
        src={product?.images[0].url || ""}
        alt="Preview of product"
        width={200}
        height={200}
      />
      {product?.discountPercentage && (
        <em className="text-pink-600 flex gap-2 items-center">
          <span>{product?.discountPercentage}%</span>
          <TagIcon width={20} />
        </em>
      )}

      <div className="flex gap-4 text-lg">
        <p>Price:</p>

        {product?.discountPercentage ? (
          <>
            <p className="font-bold">
              $
              {getDiscountPrice(
                product?.price.amount,
                product?.discountPercentage
              )}
            </p>
            <p className="line-through font-bold text-red-600">
              ${product?.price.amount}
            </p>
          </>
        ) : (
          <p className="font-bold">${product?.price.amount}</p>
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

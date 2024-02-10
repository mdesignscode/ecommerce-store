"use client";

import { TProduct } from "@/app/Components/ProductsGroup";
import Image from "next/image";
import OptionsPopover from "./OptionsPopover";
import useDeleteProduct from "@/app/hooks/deleteProduct";
import { Transition } from "@headlessui/react";

export default function Product({ product }: { product: TProduct }) {
  const { setshouldDeleteProduct, isFetching, isSuccess } = useDeleteProduct({ product });

  return (
    <Transition
      show={!isSuccess}
      leave="transition-all duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 scale-50"
      className="bg-secondary flex gap-4 rounded-lg p-2 items-center shadow-dark shadow-sm relative"
    >
      <Image
        className="rounded-lg"
        src={product?.images[0].url || ""}
        width={100}
        height={100}
        alt="Product preview"
      />
      <div className="flex flex-col flex-1">
        <p>{product?.title}</p>
        <p className="border-white border-b-2 border-t-2">
          Stock count: {product?.stock}
        </p>
        <p>${product?.price.amount}</p>
      </div>
      <OptionsPopover
        isFetching={isFetching}
        setshouldDeleteProduct={setshouldDeleteProduct}
        product={product}
      />
    </Transition>
  );
}

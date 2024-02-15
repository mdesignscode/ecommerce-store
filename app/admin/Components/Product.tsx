"use client";

import { deleteProduct } from "@/app/actions/deleteProduct";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import OptionsPopover from "./OptionsPopover";

export default function Product({ product }: { product: TProduct }) {
  const [deleteStatus, setDeleteStatus] = useState<"default" | "deleting" | "removed">("default");

  return (
    <Transition
      show={deleteStatus !== "removed"}
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
        isFetching={deleteStatus !== "removed"}
        deleteProduct={async () => {
          setDeleteStatus("deleting")
          await deleteProduct(product);
          setDeleteStatus("removed")
        }}
        product={product}
      />
    </Transition>
  );
}

"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import Product from "./Product";
import { TProduct } from "./ProductsGroup";
import { Button } from "react-aria-components";
import { useState } from "react";
import useUpdateUserList, {
  TListType,
  TQueryKey,
} from "../hooks/updateUserList";
import classNames from "classnames";
import { Transition } from "@headlessui/react";

interface IProductInUserListProps {
  product: TProduct;
  queryKey: TQueryKey;
  listType: TListType;
}

export default function ProductInUserList({
  product,
  queryKey,
  listType,
}: IProductInUserListProps) {
  const { setShouldAddToUserList, isFetching, isSuccess } = useUpdateUserList({
    queryKey,
    product,
    listType,
  });

  return (
    <Transition
      show={!isSuccess}
      leave="transition-all duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 scale-50"
      className={classNames("relative justify-center flex gap-4")}
    >
      <Product
        disableAddToShoppingCart={true}
        disableAddToWishList={true}
        styles="peer w-full border-dark border-2"
        product={product}
      />

      <Button
        onPress={() => {
          setShouldAddToUserList(true);
        }}
        className={classNames(
          "peer-hover:translate-x-2 peer-hover:-translate-y-2 transition-all bg-light p-2 rounded-full absolute -top-2 -right-2 shadow-dark shadow-sm",
          { rotate: isFetching }
        )}
      >
        <TrashIcon color="red" width={40} />
      </Button>
    </Transition>
  );
}

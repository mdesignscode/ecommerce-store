"use client";

import { Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, TooltipTrigger } from "react-aria-components";
import { updateWishList } from "@/actions/updateWishList";
import Product from "./Product";
import TooltipWrapper from "./TooltipWrapper";

interface IProductInUserListProps {
  product: TProduct;
  setWishList: Dispatch<SetStateAction<TProduct[] | null>>;
}

export default function ProductInWishList({
  product,
  setWishList,
}: IProductInUserListProps) {
  const [wishListStatus, setWishListStatus] = useState({
    loading: false,
    hasProduct: true,
  });

  return (
    <Transition
      show={wishListStatus.hasProduct}
      leave="transition-all duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 scale-50"
      className={classNames("relative justify-center flex gap-4")}
    >
      <Product
        disableAddToWishList={true}
        styles="peer w-full border-dark border-2"
        product={product}
      />

      <TooltipTrigger>
        <Button
          onPress={async () => {
            setWishListStatus((state) => ({ ...state, loading: true }));
            await updateWishList(product);

            setWishListStatus({
              loading: false,
              hasProduct: false,
            });
            setWishList((state) =>
              !state ? state : state.filter((item) => item?.id !== product?.id)
            );
          }}
          className={classNames(
            "peer-hover:translate-x-2 peer-hover:-translate-y-2 transition-all bg-light p-2 rounded-full absolute -top-2 -right-2 shadow-dark shadow-sm z-10",
            { rotate: wishListStatus.loading }
          )}
        >
          <TrashIcon color="red" width={40} />
        </Button>
        <TooltipWrapper>Remove from Wish List</TooltipWrapper>
      </TooltipTrigger>
    </Transition>
  );
}

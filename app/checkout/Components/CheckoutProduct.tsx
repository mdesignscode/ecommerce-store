"use client";

import ScaleOut from "@/app/Components/ScaleOut";
import SpinningLoader from "@/app/Components/SpinningLoader";
import { updateShoppingCart } from "@/app/actions/updateShoppingCart";
import { TProduct } from "@/components/ProductsGroup";
import { ICheckOutProduct } from "@/models/customRequests";
import {
  MinusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "react-aria-components";

export default function CheckoutProduct({
  product,
  setCheckoutProducts,
  checkoutProducts,
}: {
  product: TProduct;
  setCheckoutProducts: Dispatch<
    SetStateAction<{
      [key: string]: ICheckOutProduct;
    }>
  >;
  checkoutProducts: {
    [key: string]: ICheckOutProduct;
  };
}) {
  const [cartStatus, setCartStatus] = useState<
    "default" | "removing" | "removed"
  >("default");

  if (!product) return <></>;
  const checkOutProduct = checkoutProducts[product.id];

  if (!checkOutProduct) return <></>;

  return (
    <ScaleOut show={cartStatus !== "removed"}>
      <section className="flex-none rounded-lg gap-2 w-60 flex flex-col p-4 border-2 border-dark">
        <Image
          className="w-full h-auto m-auto rounded-lg"
          src={product.images[0].url}
          width={240}
          height={240}
          alt="Product Preview"
        />
        <p className="font-bold text-lg">{product.title}</p>
        <p className="font-bold text-lg">${product.price.amount}</p>
        <section className="flex justify-between items-center">
          <Button
            className={classNames({
              "opacity-50": checkOutProduct.quantity === 1,
            })}
            isDisabled={checkOutProduct.quantity === 1}
            onPress={() =>
              setCheckoutProducts((state) => ({
                ...state,
                [product.id]: {
                  price: state[product.id].price,
                  quantity: state[product.id].quantity - 1,
                },
              }))
            }
          >
            <MinusCircleIcon width={30} />
          </Button>
          <div className="flex flex-col">
            <p className="font-bold">Quantity: {checkOutProduct.quantity}</p>
          </div>
          <Button
            className={classNames({
              "opacity-50": checkOutProduct.quantity === product.stock,
            })}
            isDisabled={checkOutProduct.quantity === product.stock}
            onPress={() =>
              setCheckoutProducts((state) => ({
                ...state,
                [product.id]: {
                  price: state[product.id].price,
                  quantity: state[product.id].quantity + 1,
                },
              }))
            }
          >
            <PlusIcon width={30} />
          </Button>
        </section>
        <Button
          isDisabled={cartStatus !== "default"}
          onPress={async () => {
            setCartStatus("removing");
            await updateShoppingCart(product);
            setCartStatus("removed");
          }}
          className={classNames(
            "bg-red-600 text-white text-sm rounded-lg p-2 flex gap-4 justify-center items-center",
            { "opacity-50 cursor-not-allowed": cartStatus !== "default" },
          "focus:outline-red-600"
          )}
        >
          Remove from Cart
          {cartStatus !== "default" ? (
            <SpinningLoader />
          ) : (
            <TrashIcon width={20} />
          )}
        </Button>
      </section>
    </ScaleOut>
  );
}

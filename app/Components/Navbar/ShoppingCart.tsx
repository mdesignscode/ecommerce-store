"use client";

import { updateShoppingCart } from "@/app/actions/updateShoppingCart";
import useGlobalStore from "@/lib/store";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Button as MUIButton } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "react-aria-components";
import ShoppingCartUnavailable from "./ShoppingCartUnavailable";

export default function ShoppingCart() {
  const { activeUser, userShoppingCart, setUserShoppingCart } =
      useGlobalStore(),
    [removingCartItem, setRemovingCartItem] = useState(userShoppingCart?.map(() => false) || []);

  if (!activeUser) return <ShoppingCartUnavailable reason="no user" />;

  if (!userShoppingCart || !userShoppingCart.length)
    return <ShoppingCartUnavailable reason="cart empty" />;

  return (
    <section className="flex flex-col gap-2 p-2 h-full">
      {userShoppingCart.map((item, i) =>
        !item ? (
          <></>
        ) : (
          <div
            className="rounded-lg p-4 relative border-2 flex flex-col gap-2 border-dark"
            key={item?.id}
          >
            <div className="flex gap-4">
              <Image
                src={item?.images[0].url || ""}
                className="rounded-lg w-14 md:w-16 h-auto"
                alt="Image Preview"
                width={56}
                height={56}
              />

              <strong>
                $
                {Math.round(
                  item.price.amount -
                    (item.discountPercentage
                      ? item.price.amount * (item.discountPercentage / 100)
                      : item.price.amount)
                )}
              </strong>
            </div>

            <p>{item?.title}</p>

            <Button
              isDisabled={removingCartItem[i]}
              className={classNames("absolute -top-2 -right-2", {
                "animate-spin": removingCartItem[i],
              })}
              onPress={async () => {
                setRemovingCartItem(state => state.map((_, j) => i === j ? true : false))
                await updateShoppingCart(item);
                setUserShoppingCart(
                  userShoppingCart?.filter(
                    (product) => item?.id !== product?.id
                  )
                );
              }}
            >
              <XCircleIcon width={30} />
            </Button>
          </div>
        )
      )}

      <Link href="/checkout" className="mt-auto mx-auto">
        <MUIButton color="primary" variant="contained" className="flex gap-4">
          <span>Checkout</span>
          <ShoppingBagIcon width={25} />
        </MUIButton>
      </Link>
    </section>
  );
}

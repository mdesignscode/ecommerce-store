"use client";

import useUpdateUserList from "@/hooks/updateUserList";
import "@/styles/heartbeat.css";
import "@/styles/moveCart.css";
import "@/styles/wobble.css";
import { useUser } from "@clerk/nextjs";
import {
  HeartIcon as HeartIconOutline,
  ShoppingCartIcon as ShoppingCartIconOutline,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
} from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { Button } from "react-aria-components";
import { TProduct } from "./ProductsGroup";

export default function AddToUserList({
  product,
  disableAddToWishList,
  disableAddToShoppingCart,
}: {
  product: TProduct;
  disableAddToWishList?: boolean;
  disableAddToShoppingCart?: boolean;
}) {
  // add to wish list
  const {
      productInUserList: productInWishList,
      isFetching: wishListLoading,
      setShouldAddToUserList: setShouldAddToWishList,
    } = useUpdateUserList({
      product,
      queryKey: "addToWishList",
      listType: "wishList",
    }),
    // add to shopping cart
    {
      productInUserList: productInShoppingCart,
      isFetching: cartLoading,
      setShouldAddToUserList: setShouldAddToCart,
    } = useUpdateUserList({
      product,
      queryKey: "addToShoppingCart",
      listType: "shoppingCart",
    }),
    { user } = useUser(),
    router = useRouter();

  return (
    <section className="flex justify-between">
      <Button
        className={classNames(
          {
            "pointer-events-none": cartLoading || disableAddToShoppingCart,
          },
          "wobble"
        )}
        onPress={() => {
          if (!user) {
            router.push("/sign-in");
            return;
          }
          setShouldAddToCart(true);
        }}
      >
        {productInShoppingCart ? (
          <ShoppingCartIconSolid
            width={50}
            className={classNames({
              moveCart: cartLoading,
            })}
          />
        ) : (
          <ShoppingCartIconOutline
            width={50}
            className={classNames({
              moveCart: cartLoading,
            })}
          />
        )}
      </Button>

      <Button
        className={classNames(
          {
            "pointer-events-none": wishListLoading || disableAddToWishList,
          },
          "wobble"
        )}
        onPress={() => {
          if (!user) {
            router.push("/sign-in");
            return;
          }
          setShouldAddToWishList(true);
        }}
      >
        {productInWishList ? (
          <HeartIconSolid
            color="hotpink"
            className={classNames({
              heartbeat: wishListLoading,
            })}
            width={50}
          />
        ) : (
          <HeartIconOutline
            className={classNames({
              heartbeat: wishListLoading,
            })}
            color="hotpink"
            width={50}
          />
        )}
      </Button>
    </section>
  );
}

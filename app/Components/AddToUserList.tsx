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
import { Button, TooltipTrigger } from "react-aria-components";
import { TProduct } from "./ProductsGroup";
import TooltipComponent from "./Tooltip";

export default function AddToUserList({
  product,
  disableAddToWishList,
  disableAddToShoppingCart,
  showingProduct
}: {
  product: TProduct;
  disableAddToWishList?: boolean;
  disableAddToShoppingCart?: boolean;
  showingProduct?: boolean;
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
    router = useRouter(),
    iconWidth = {
      "w-12": showingProduct,
      "w-10 md:w-[50px]": !showingProduct,
    };

  return (
    <section className="flex justify-between">
      <TooltipTrigger>
        <Button
          isDisabled={cartLoading || disableAddToShoppingCart}
          className={classNames(
            {
              "cursor-not-allowed":
                cartLoading || disableAddToShoppingCart,
            },
            "text-primary"
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
              className={classNames({
                moveCart: cartLoading,
                ...iconWidth,
              })}
            />
          ) : (
            <ShoppingCartIconOutline
              className={classNames({
                moveCart: cartLoading,
                ...iconWidth,
              })}
            />
          )}
        </Button>
        <TooltipComponent text="Add or remove from Shopping Cart" />
      </TooltipTrigger>

      <TooltipTrigger>
        <Button
          isDisabled={wishListLoading || disableAddToWishList}
          className={classNames({
            "cursor-not-allowed":
              wishListLoading || disableAddToWishList,
          })}
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
                ...iconWidth,
              })}
            />
          ) : (
            <HeartIconOutline
              className={classNames({
                heartbeat: wishListLoading,
                ...iconWidth,
              })}
              color="hotpink"
            />
          )}
        </Button>
        <TooltipComponent text="Add or remove from Wish List" />
      </TooltipTrigger>
    </section>
  );
}

"use client";

import useGlobalStore from "@/lib/store";
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
import { useEffect, useState } from "react";
import { Button, TooltipTrigger } from "react-aria-components";
import { updateShoppingCart } from "@/actions/updateShoppingCart";
import { updateWishList } from "@/actions/updateWishList";
import TooltipWrapper from "./TooltipWrapper";
import AddToUserListSkeleton from "./Skeletons/AddToUserList";

export default function AddToUserList({
  product,
  disableAddToWishList,
  disableAddToShoppingCart,
  showingProduct,
}: {
  product: TProduct;
  disableAddToWishList?: boolean;
  disableAddToShoppingCart?: boolean;
  showingProduct?: boolean;
}) {
  // add to wish list
  const { setCurrentUser, currentUser } = useGlobalStore(),
    { wishList, user: activeUser, shoppingCart, loaded } = currentUser,
    // add to wish list
    [wishListStatus, setWishListStatus] = useState({
      loading: false,
      hasProduct: false,
    }),
    // add to shopping cart
    [cartStatus, setCartStatus] = useState({
      loading: false,
      hasProduct: false,
    }),
    { user } = useUser(),
    router = useRouter(),
    iconWidth = {
      "w-12": showingProduct,
      "w-10 md:w-[50px]": !showingProduct,
    };

  useEffect(() => {
    const setWishListHasProduct = async () => {
      setWishListStatus((state) => ({
        ...state,
        hasProduct: !!wishList?.filter((item) => item?.id === product?.id)
          .length,
      }));
    };

    if (activeUser) {
      setCartStatus((state) => ({
        ...state,
        hasProduct: !!shoppingCart?.filter((item) => item?.id === product?.id)
          .length,
      }));
      setWishListHasProduct();
    }
  }, [activeUser, product?.id, shoppingCart, wishList]);

  if (user && !loaded) return <AddToUserListSkeleton />

  return (
    <section className="flex justify-between">
      <TooltipTrigger>
        <Button
          isDisabled={cartStatus.loading || disableAddToShoppingCart}
          className={classNames(
            {
              "cursor-not-allowed":
                cartStatus.loading || disableAddToShoppingCart,
            },
            "text-primary"
          )}
          onPress={async () => {
            if (!user) {
              router.push("/sign-in");
              return;
            }
            setCartStatus((state) => ({ ...state, loading: true }));
            const updatedCart = await updateShoppingCart(product);

            if (updatedCart) {
              setCartStatus({
                loading: false,
                hasProduct: updatedCart.productInShoppingCart,
              });
              let updatedShoppingCart: typeof shoppingCart;

              if (product) {
                if (!shoppingCart || !shoppingCart.length)
                  updatedShoppingCart = [product];
                else
                  updatedShoppingCart = !updatedCart.productInShoppingCart
                    ? shoppingCart.filter((item) => item?.id !== product.id)
                    : [...shoppingCart, product];
              }

              setCurrentUser(currentUser, {
                user: updatedCart.user,
                shoppingCart: updatedShoppingCart,
              });
            }
          }}
        >
          {cartStatus.hasProduct ? (
            <ShoppingCartIconSolid
              className={classNames({
                moveCart: cartStatus.loading,
                ...iconWidth,
              })}
            />
          ) : (
            <ShoppingCartIconOutline
              className={classNames({
                moveCart: cartStatus.loading,
                ...iconWidth,
              })}
            />
          )}
        </Button>
        <TooltipWrapper>Add or remove from Shopping Cart</TooltipWrapper>
      </TooltipTrigger>

      <TooltipTrigger>
        <Button
          isDisabled={wishListStatus.loading || disableAddToWishList}
          className={classNames({
            "cursor-not-allowed":
              wishListStatus.loading || disableAddToWishList,
          })}
          onPress={async () => {
            if (!user) {
              router.push("/sign-in");
              return;
            }
            setWishListStatus((state) => ({ ...state, loading: true }));
            const updatedList = await updateWishList(product);

            if (updatedList) {
              setWishListStatus({
                loading: false,
                hasProduct: updatedList.productInWishList,
              });

              let updatedWishList: typeof wishList;

              if (product) {
                if (!wishList || !wishList.length) updatedWishList = [product];
                else
                  updatedWishList = !updatedList.productInWishList
                    ? wishList.filter((item) => item?.id !== product.id)
                    : [...wishList, product];
              }

              setCurrentUser(currentUser, {
                user: updatedList.user,
                wishList: updatedWishList,
              });
            }
          }}
        >
          {wishListStatus.hasProduct ? (
            <HeartIconSolid
              color="hotpink"
              className={classNames({
                heartbeat: wishListStatus.loading,
                ...iconWidth,
              })}
            />
          ) : (
            <HeartIconOutline
              className={classNames({
                heartbeat: wishListStatus.loading,
                ...iconWidth,
              })}
              color="hotpink"
            />
          )}
        </Button>
        <TooltipWrapper>Add or remove from Wish List</TooltipWrapper>
      </TooltipTrigger>
    </section>
  );
}

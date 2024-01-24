"use client";

import useGlobalStore from "@/lib/store";
import { useUser } from "@clerk/nextjs";
import {
  HeartIcon as HeartIconOutline,
  ShoppingCartIcon as ShoppingCartIconOutline,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
} from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-aria-components";
import { IUpdateUserList } from "../api/models";
import {} from "../api/users/addToWishList/route";
import { TProduct } from "./ProductsGroup";

export default function AddToUserList({ product }: { product: TProduct }) {
  const [shouldAddToWishList, setShouldAddToWishList] = useState(false),
    [shouldAddToCart, setShouldAddToCart] = useState(false),
    { user } = useUser(),
    { activeUser, setActiveUser } = useGlobalStore(),
    [productInWishList, setProductInWishList] = useState(false),
    [productInShoppingCart, setProductInShoppingCart] = useState(false);

  useEffect(() => {
    if (activeUser) {
      setProductInWishList(
        !!activeUser.wishList?.products?.filter(
          (wishItem) => wishItem.productId === product.id
        )[0]
      );
      setProductInShoppingCart(
        !!activeUser.shoppingCart?.products?.filter(
          (cartItem) => cartItem.productId === product.id
        )[0]
      );
    }
  }, [activeUser, product.id, setProductInWishList]);

  // prepare url for updating list
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = baseUrl + "users/updateList";

  // add to wish list stats
  const { isFetched: addedToWishList, isSuccess: wishListUpdated } = useQuery<
    Record<string, number>
  >({
    queryKey: ["addToWishList-" + product.id],
    queryFn: async () => {
      if (!activeUser) return;

      try {
        const { data } = await axios.post(url, {
          userId: user?.id,
          product,
          listType: "wishList",
          listId: activeUser.wishListId,
        } as IUpdateUserList);
        setActiveUser(data);
        setShouldAddToWishList(false);
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    initialData: {},
    enabled: shouldAddToWishList,
  });

  // add to shopping cart
  const { isSuccess: cartUpdated, isFetched: addedToCart } = useQuery<
    Record<string, number>
  >({
    queryKey: ["addToShoppingCart"],
    queryFn: async () => {
      if (!activeUser) return;

      try {
        const { data } = await axios.post(url, {
          userId: user?.id,
          product,
          listType: "shoppingCart",
          listId: activeUser.shoppingCartId,
        } as IUpdateUserList);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    initialData: {},
    enabled: shouldAddToCart,
  });

  return (
    <section className="flex justify-between peer">
      <Button onPress={() => setShouldAddToCart(true)}>
        {productInShoppingCart ? (
          <ShoppingCartIconSolid width={50} />
        ) : (
          <ShoppingCartIconOutline width={50} />
        )}
      </Button>

      <Button onPress={() => setShouldAddToWishList(true)}>
        {productInWishList ? (
          <HeartIconSolid width={50} />
        ) : (
          <HeartIconOutline width={50} />
        )}
      </Button>
    </section>
  );
}

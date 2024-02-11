"use client";

import useGlobalStore from "@/lib/store";
import { useEffect } from "react";
import { getShopingCart } from "../actions/getShoppingCart";
import { getUser } from "../actions/getUser";
import { getWishList } from "../actions/getWishList";
import { useUser } from "@clerk/nextjs";
import { getPurchaseHistory } from "../actions/getPurchaseHistory";

export default function SetActiveUser() {
  const {
      setActiveUser,
      setUserShoppingCart,
      setUserWishList,
      setUserPurchaseHistory,
    } = useGlobalStore(),
    { user } = useUser();

  useEffect(() => {
    const setUserData = async () => {
      setActiveUser(await getUser());
      setUserShoppingCart(await getShopingCart());
      setUserWishList(await getWishList());
      setUserPurchaseHistory(await getPurchaseHistory());
    };

    if (user) setUserData();
  }, [
    setActiveUser,
    setUserPurchaseHistory,
    setUserShoppingCart,
    setUserWishList,
    user,
  ]);

  return <></>;
}

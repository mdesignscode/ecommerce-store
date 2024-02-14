"use client";

import useGlobalStore from "@/lib/store";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { getPurchaseHistory } from "@/actions/getPurchaseHistory";
import { getShopingCart } from "@/actions/getShoppingCart";
import { getUser } from "@/actions/getUser";
import { getWishList } from "@/actions/getWishList";

export default function SetActiveUser() {
  const { setCurrentUser } = useGlobalStore(),
    { user } = useUser();

  useEffect(() => {
    const setUserData = async () => {
      const activeUser = await getUser(),
        shoppingCart = await getShopingCart(),
        wishList = await getWishList(),
        purchaseHistory = await getPurchaseHistory();

      setCurrentUser(
        { loaded: true },
        {
          wishList,
          user: activeUser,
          shoppingCart,
          purchaseHistory,
        }
      );
    };

    if (user) setUserData();
  }, [setCurrentUser, user]);

  return <></>;
}

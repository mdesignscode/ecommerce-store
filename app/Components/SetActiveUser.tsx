"use client";

import useGlobalStore from "@/lib/store";
import { useEffect } from "react";
import { getShopingCart } from "../actions/getShoppingCart";
import { getUser } from "../actions/getUser";
import { getWishList } from "../actions/getWishList";

export default function SetActiveUser() {
  const { setActiveUser, setUserShoppingCart, setUserWishList } = useGlobalStore()

  useEffect(() => {
    const setUserData = async () => {
      setActiveUser(await getUser())
      setUserShoppingCart(await getShopingCart())
      setUserWishList(await getWishList())
    }

    setUserData()
  }, [setActiveUser, setUserShoppingCart, setUserWishList])

  return <></>;
}

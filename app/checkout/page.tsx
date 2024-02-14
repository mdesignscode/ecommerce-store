"use client";

import EmptyList from "@/Components/EmpyList";
import CheckoutPage from "./Components/CheckoutPage";
import useGlobalStore from "@/lib/store";
import { useUser } from "@clerk/nextjs";
import CheckoutPageSkeleton from "@/Skeletons/CheckoutPage";
import { useEffect, useState } from "react";
import { getShopingCart } from "@/actions/getShoppingCart";

export default function Page() {
  const {
      currentUser: { shoppingCart, user },
    } = useGlobalStore()

  if ((!shoppingCart || !shoppingCart.length) && user)
    return <EmptyList listType="Shopping Cart" />;

  if (shoppingCart)
    return (
      <main className="p-4 text-center overflow-x-hidden h-full overflow-y-auto">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <CheckoutPage products={shoppingCart} />
      </main>
    );
  else return <CheckoutPageSkeleton />;
}

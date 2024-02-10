"use client"

import EmptyList from "@/components/EmpyList";
import CheckoutPage from "./Components/CheckoutPage";
import useGlobalStore from "@/lib/store";
import { useUser } from "@clerk/nextjs";
import WaterfallLoader from "../Components/WaterfallLoader";
import CheckoutPageSkeleton from "../Components/Skeletons/CheckoutPage";
import { useEffect, useState } from "react";
import { TProduct } from "../Components/ProductsGroup";
import { getShopingCart } from "../actions/getShoppingCart";

export default function Page() {
  const { activeUser } = useGlobalStore(),
    { isSignedIn } = useUser(),
    [shoppingCart, setShoppingCart] = useState<TProduct[] | null>(null)

  useEffect(() => {
    const setCart = async () => {
      const cart = await getShopingCart()
      setShoppingCart(cart)
    }
    setCart();
  }, [])

  if ((!shoppingCart || !shoppingCart.length) && isSignedIn && activeUser)
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

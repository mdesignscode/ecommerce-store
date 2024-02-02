"use client"

import EmptyList from "@/components/EmpyList";
import CheckoutPage from "./Components/CheckoutPage";
import useGetShoppingCart from "../hooks/getShoppingCart";
import useGlobalStore from "@/lib/store";
import { useUser } from "@clerk/nextjs";
import WaterfallLoader from "../Components/WaterfallLoader";
import CheckoutPageSkeleton from "../Components/Skeletons/CheckoutPage";

export default function Page() {
  const { activeUser } = useGlobalStore(),
    { isSignedIn } = useUser(),
    { data, isSuccess } = useGetShoppingCart();

  if ((!data || !data.length) && isSignedIn && activeUser)
    return <EmptyList listType="Shopping Cart" />;

  if (isSuccess && data)
    return (
      <main className="p-4 text-center overflow-x-hidden h-full overflow-y-auto">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <CheckoutPage products={data} />
      </main>
    );
  else return <CheckoutPageSkeleton />
}

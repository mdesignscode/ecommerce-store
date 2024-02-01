"use client";

import useGlobalStore from "@/lib/store";
import { useUser } from "@clerk/nextjs";
import EmptyList from "../Components/EmpyList";
import UserList from "../Components/UserList";
import WaterfallLoader from "../Components/WaterfallLoader";
import useGetShoppingCart from "../hooks/getShoppingCart";

export default function Page() {
  const { activeUser } = useGlobalStore(),
    { isSignedIn, isLoaded } = useUser(),
    { data, isFetching, isSuccess } = useGetShoppingCart();

  if (isLoaded && !activeUser) return <WaterfallLoader text="User data" />;

  if (isFetching) return <WaterfallLoader text="Your Shopping Cart" />;

  if ((!data || !data.length) && isSignedIn)
    return <EmptyList listType="Shopping Cart" />;

  if (isSuccess && data)
    return <UserList list={data} title="Your Shopping Cart" />;
}

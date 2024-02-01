"use client";

import useGlobalStore from "@/lib/store";
import { useUser } from "@clerk/nextjs";
import EmptyList from "../Components/EmpyList";
import UserList from "../Components/UserList";
import WaterfallLoader from "../Components/WaterfallLoader";
import useGetWishList from "../hooks/getWishList";

export default function Page() {
  const { activeUser } = useGlobalStore(),
    { isSignedIn, isLoaded } = useUser(),
    { data, isFetching, isSuccess } = useGetWishList();

  if (isLoaded && !activeUser) return <WaterfallLoader text="User data" />;

  if (isFetching) return <WaterfallLoader text="Your Wish List" />;

  if ((!data || !data.length) && isSignedIn)
    return <EmptyList listType="Wish List" />;

  if (isSuccess && data)
    return <UserList list={data} title="Your Wish List" />;
}

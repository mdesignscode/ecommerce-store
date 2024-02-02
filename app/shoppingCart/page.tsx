"use client";

import UserListSkeleton from "../Components/Skeletons/UserList";
import UserList from "../Components/UserList";
import useGetShoppingCart from "../hooks/getShoppingCart";

export default function Page() {
  const { data, isSuccess } = useGetShoppingCart();

  if (isSuccess && data)
    return <UserList list={data} title="Your Shopping Cart" />;
  else return <UserListSkeleton />;
}

"use client";

import UserListSkeleton from "../Components/Skeletons/UserList";
import UserList from "../Components/UserList";
import useGetWishList from "../hooks/getWishList";

export default function Page() {
  const { data, isSuccess } = useGetWishList();

  if (isSuccess && data) return <UserList list={data} title="Your Wish List" />;
  else return <UserListSkeleton />;
}

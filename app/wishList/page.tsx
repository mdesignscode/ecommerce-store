"use client";

import { useEffect, useState } from "react";
import EmptyList from "@/Components/EmpyList";
import UserList from "@/Components/UserList";
import { getWishList } from "@/actions/getWishList";

export default function Page() {
  const [wishList, setWishList] = useState<TProduct[] | null>(null);

  useEffect(() => {
    const setUserWishList = async () => setWishList(await getWishList());

    setUserWishList();
  }, []);

  if (!wishList || !wishList.length) return <EmptyList listType="Wish List" />;

  return (
    <UserList
      setWishList={setWishList}
      list={wishList}
      title="Your Wish List"
    />
  );
}

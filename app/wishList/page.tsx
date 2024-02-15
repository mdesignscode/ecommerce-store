"use client";

import EmptyList from "@/Components/EmpyList";
import useGlobalStore from "@/lib/store";
import ProductInWishList from "@/Components/ProductInUserList";
import WishListSkeleton from "../Components/Skeletons/WishList";

export default function Page() {
  const { currentUser: { wishList, loaded } } = useGlobalStore()

  if (!loaded) return <WishListSkeleton />

  if (!wishList || !wishList.length) return <EmptyList listType="Wish List" />;

  return (
    <main className="flex flex-col py-4 items-center mb-14">
      <h1 className="text-2l md:text-2xl font-bold">Your Wish List</h1>

      <section className="w-3/5 md:items-stretch md:w-5/6 gap-4 flex flex-col md:flex-row items-center flex-wrap md:justify-center mt-4">
        {wishList.map((item) => (
          <ProductInWishList
            product={item}
            key={item?.id}
          />
        ))}
      </section>
    </main>
  );
}

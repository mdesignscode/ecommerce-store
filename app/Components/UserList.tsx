"use client";

import { Dispatch, SetStateAction } from "react";
import ProductInWishList from "./ProductInUserList";
import { TProduct } from "./ProductsGroup";

export default function UserList({
  list,
  title,
  setWishList
}: {
  list: TProduct[];
  title: string;
  setWishList: Dispatch<SetStateAction<TProduct[] | null>>;
}) {
  return (
    <main className="flex flex-col py-4 items-center mb-14">
      <h1 className="text-2l md:text-2xl font-bold">{title}</h1>

      <section className="w-3/5 md:items-stretch md:w-5/6 gap-4 flex flex-col md:flex-row items-center flex-wrap md:justify-center mt-4">
        {list.map((item) => (
          <ProductInWishList
            setWishList={setWishList}
            product={item}
            key={item?.id}
          />
        ))}
      </section>
    </main>
  );
}

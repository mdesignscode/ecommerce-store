"use client";

import ProductInUserList from "./ProductInUserList";
import { TProduct } from "./ProductsGroup";

export default function UserList({ list, title }: { list: TProduct[], title: string }) {
  return (
    <main className="flex flex-col py-4 items-center mb-14">
      <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
      <section className="w-3/5 md:items-stretch md:w-5/6 gap-4 flex flex-col md:flex-row items-center flex-wrap md:justify-center mt-4">
        {list?.map(
          (item) =>
            item && (
              <ProductInUserList
                queryKey="addToShoppingCart"
                listType="shoppingCart"
                product={item}
                key={item.id}
              />
            )
        )}
      </section>
    </main>
  );
}

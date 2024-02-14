"use client";

import { useState } from "react";
import "../styles/form.css";
import EditProduct from "./EditProduct";
import { EditProductProvider } from "./context";

export default function ProductPage({
  product,
  categories,
}: {
  product: TProduct;
  categories: string[];
}) {
  const productObj = Object.assign({}, product);

  // attributes to hide
  delete (productObj as any).priceId;

  const [editState, setEditState] = useState<TProductEdit>(
    Object.fromEntries(
      // each attribute has an edit state and a value
      Object.keys(productObj).map((key) => [
        [key],
        key === "images"
          ? Object.fromEntries(
              product?.images.map((image) => [
                image.url,
                { text: image.url, editing: false },
              ]) || []
            )
          : {
              text:
                key === "price" ? product?.price.amount : (product as any)[key],
              editing: false,
            },
      ])
    )
  );

  return (
    <main className="flex flex-col gap-4 items-center h-full p-4 overflow-y-auto">
      <h1 className="text-center text-lg font-bold">Edit {product?.title}</h1>

      <EditProductProvider
        categories={categories}
        product={product}
        editState={editState}
        setEditState={setEditState}
      >
        <EditProduct />
      </EditProductProvider>
    </main>
  );
}

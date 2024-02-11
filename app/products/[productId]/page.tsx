import prisma from "@/lib/prisma";
import ImageThumbnails from "./Components/ImageThumbnails";
import AddToUserList from "@/app/Components/AddToUserList";
import { getDiscountPrice } from "@/utils";

export default async function Page({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const product = await prisma.product.findUnique({
    include: { images: true, price: true },
    where: {
      id: productId,
    },
  });

  if (!product) {
    return <p>Product not found</p>;
  }
  return (
    <main className="flex flex-col py-4 items-center m-2 flex-">
      <article className="flex flex-col gap-2 p-2 w-full md:w-3/6">
        <ImageThumbnails images={product.images} />
        <div className="flex text-xl md:text-2xl justify-between">
          {product?.discountPercentage ? (
            <div className="flex gap-4">
              <p className="font-bold">
                $
                {getDiscountPrice(
                  product?.price.amount,
                  product?.discountPercentage
                )}
              </p>
              <p className="line-through font-bold text-red-600">
                ${product?.price.amount}
              </p>
            </div>
          ) : (
            <p className="font-bold">${product?.price.amount}</p>
          )}
          <span className="text-2xl md:text-3xl">
            {Array.from({ length: product.rating }, () => "⭐")}
          </span>
        </div>

        <h1 className=" md:text-xl">{product.title}</h1>
        <p className="text-sm text-gray-600 md:text-lg">
          {product.description}
        </p>

        <p className=" md:text-lg">Items left in stock: {product.stock}</p>

        <AddToUserList showingProduct={true} product={product} />
      </article>
    </main>
  );
}

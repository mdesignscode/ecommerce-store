import prisma from "@/lib/prisma";
import ImageThumbnails from "./Components/ImageThumbnails";

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
    <main className="flex flex-col py-4 items-center m-2">
      <ImageThumbnails images={product.images} />

      <article className="flex flex-col gap-2 p-2 w-full">
        <div className="flex text-2xl justify-between">
          <strong>${product.price.amount}</strong>
          <span className="text-2xl">
            {Array.from({ length: product.rating }, () => "⭐")}
          </span>
        </div>

        <h1>{product.title}</h1>
        <p className="text-sm text-gray-600">{product.description}</p>

        <p>Items left in stock: {product.stock}</p>
      </article>
    </main>
  );
}

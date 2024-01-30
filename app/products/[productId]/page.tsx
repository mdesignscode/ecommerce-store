import prisma from "@/lib/prisma";
import ImageThumbnails from "./Components/ImageThumbnails";
import AddToUserList from "@/app/Components/AddToUserList";

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
        <div className="flex text-2xl justify-between">
          <strong className="md:text-3xl">${product.price.amount}</strong>
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

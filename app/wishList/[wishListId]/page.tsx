import EmptyList from "@/app/Components/EmpyList";
import ProductInUserList from "@/app/Components/ProductInUserList";
import prisma from "@/lib/prisma";
import "@/styles/index.css";

export default async function Page({
  params: { wishListId },
}: {
  params: { wishListId: string };
}) {
  if (wishListId === "empty") return <EmptyList listType="Wish List" />;

  const userWishList = await prisma.wishList.findUnique({
    where: {
      id: parseInt(wishListId),
    },
    include: { products: true },
  });

  if (!userWishList || !userWishList.products.length)
    return <EmptyList listType="Wish List" />;

  const wishItems = await Promise.all(
    userWishList?.products.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: {
          id: item.productId,
        },
        include: { images: true },
      });
      return product;
    })
  );

  return (
    <main className="flex flex-col py-4 items-center mb-14">
      <h1 className="text-xl font-bold">Your Wish List</h1>

      <section>
        {wishItems?.map(
          (item) =>
            item && (
              <ProductInUserList
                queryKey="addToWishList"
                listType="wishList"
                product={item}
                key={item.id}
              />
            )
        )}
      </section>
    </main>
  );
}

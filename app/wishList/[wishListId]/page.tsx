import UserList from "@/app/Components/UserList";
import EmptyList from "@/components/EmpyList";
import ProductInUserList from "@/components/ProductInUserList";
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
        include: { images: true, price: true },
      });
      return product;
    })
  );

  return <UserList list={wishItems} title="Your Wish List" />;
}

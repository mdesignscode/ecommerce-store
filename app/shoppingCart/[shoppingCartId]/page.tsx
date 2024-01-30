import UserList from "@/app/Components/UserList";
import EmptyList from "@/components/EmpyList";
import ProductInUserList from "@/components/ProductInUserList";
import prisma from "@/lib/prisma";

export default async function Page({
  params: { shoppingCartId },
}: {
  params: { shoppingCartId: string };
}) {
  if (shoppingCartId === "empty") return <EmptyList listType="Shopping Cart" />;

  const userShoppingCart = await prisma.shoppingCart.findUnique({
    where: {
      id: parseInt(shoppingCartId),
    },
    include: { products: true },
  });

  if (!userShoppingCart || !userShoppingCart.products.length)
    return <EmptyList listType="Shopping Cart" />;

  const cartItems = await Promise.all(
    userShoppingCart?.products.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: {
          id: item.productId,
        },
        include: { images: true, price: true },
      });
      return product;
    })
  );

  return (
    <UserList list={cartItems} title="Your Shopping Cart" />
  );
}

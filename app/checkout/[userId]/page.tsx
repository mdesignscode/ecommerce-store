import EmptyList from "@/components/EmpyList";
import prisma from "@/lib/prisma";
import CheckoutPage from "./Components/CheckoutPage";

export default async function Page({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return (
      <h1 className="text-center text-xl text-red-600 font-bold">
        User not found
      </h1>
    );

  if (!user.shoppingCartId) return <EmptyList listType="Shopping Cart" />;

  const userShoppingCart = await prisma.shoppingCart.findUnique({
    where: {
      id: user.shoppingCartId,
    },
    include: { products: true },
  });

  if (!userShoppingCart || !userShoppingCart.products.length)
    return <EmptyList listType="Shopping Cart" />;

  const cartItems = await Promise.all(
    userShoppingCart.products.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: {
          id: item.productId,
        },
        include: { images: true, price: true },
      });
      return product;
    })
  );

  if (!cartItems || !cartItems.length)
    return <EmptyList listType="Shopping Cart" />;

  return (
    <main className="p-4 text-center">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <CheckoutPage products={cartItems} />
    </main>
  );
}

import EmptyList from "@/app/Components/EmpyList";
import Product from "@/app/Components/Product";
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

  if (!userShoppingCart) return <EmptyList listType="Shopping Cart" />;

  const cartItems = await Promise.all(
    userShoppingCart?.products.map(async (item) => {
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
    <section>
      {cartItems?.map(
        (item) => item && <Product key={item.id} product={item} />
      )}
    </section>
  );
}

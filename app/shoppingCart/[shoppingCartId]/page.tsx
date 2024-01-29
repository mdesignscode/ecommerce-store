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
    <main className="flex flex-col py-4 items-center mb-14">
      <h1 className="text-xl font-bold">Your Wish List</h1>
      <section>
        {cartItems?.map(
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

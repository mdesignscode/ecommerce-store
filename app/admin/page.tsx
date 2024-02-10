import prisma from "@/lib/prisma";
import HomePage from "./Components/HomePage";

export default async function Page() {
  const products = await prisma.product.findMany({
    include: {
      price: true,
      images: true,
    },
  });

  return <HomePage products={products} />
}

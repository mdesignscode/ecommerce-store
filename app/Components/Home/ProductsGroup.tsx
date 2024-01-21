import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";

const Product = dynamic(() => import("./Product"));

export type TProduct = {
  images: {
    id: number;
    url: string;
    productId: number | null;
  }[];
} & {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  discountPercentage: number | null;
  stock: number;
};

interface IProductsGroupProps {
  products?: TProduct[];
  groupTitle: string;
  groupUrl: string;
}

export default async function ProductsGroup({
  products,
  groupUrl,
  groupTitle,
}: IProductsGroupProps) {
  const productsGroup = products
    ? products
    : await prisma.product.findMany({
        where: {
          category: groupUrl,
        },
        include: {
          images: true,
        },
      });

  return (
    <section className="w-full flex flex-col gap-4 bg-secondary p-2">
      <h2 className="font-bold">{groupTitle}</h2>

      <section className="flex gap-4 whitespace-nowrap overflow-x-auto w-full snap-x">
        {productsGroup.slice(0, 5).map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </section>

      <p>View More</p>
    </section>
  );
}

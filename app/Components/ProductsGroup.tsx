import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";
import Link from "next/link";

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
    <section className="w-full gap-2 flex flex-col bg-secondary p-2 items-start">
      <h2 className="font-bold md:text-xl">{groupTitle}</h2>

      <section className="flex overflow-x-auto w-full whitespace-nowrap snap-x">
        {productsGroup.slice(0, 5).map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </section>

      <Link
        href={"/categories/" + groupUrl}
        className="text-primary no-underline hover:underline underline-offset-2 md:text-lg"
      >
        View More {groupTitle}
      </Link>
    </section>
  );
}

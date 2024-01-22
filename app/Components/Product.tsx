import Image from "next/image";
import { TProduct } from "./ProductsGroup";
import classNames from "classnames";
import Link from "next/link";

interface IProductProps {
  product: TProduct;
  styles?: string;
}

export default function Product({ product, styles }: IProductProps) {
  return (
    <Link
      href={"/products/" + product.id}
      className={classNames(
        "bg-light flex flex-col w-60 hover:shadow-lg rounded-lg p-2 flex-none gap-2 transition-all hover:scale-105 m-3",
        styles
      )}
    >
      <p className="text-ellipsis overflow-hidden">{product.title}</p>

      <Image
        className={classNames("rounded-lg w-full")}
        src={product.images[0].url}
        alt="Preview of product"
        width={200}
        height={200}
      />

      <div className="flex gap-4 text-lg">
        <p>Price:</p>

        {product.discountPercentage ? (
          <>
            <p className="font-bold">
              ${Math.round(product.price * (product.discountPercentage / 100))}
            </p>
            <p className="line-through font-bold text-red-600">
              ${product.price}
            </p>
          </>
        ) : (
          <p className="font-bold">${product.price}</p>
        )}
      </div>
    </Link>
  );
}

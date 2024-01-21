import Image from "next/image";
import { TProduct } from "./ProductsGroup";
import classNames from "classnames";

export default function Product({ product }: { product: TProduct }) {
  return (
    <div className="bg-light flex flex-col w-60 shadow-lg rounded-lg p-2 flex-none gap-2">
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
        <p className="line-through font-bold text-red-600">${product.price}</p>

        {product.discountPercentage && (
          <p className="font-bold">
            ${Math.round(product.price * (product.discountPercentage / 100))}
          </p>
        )}
      </div>
    </div>
  );
}

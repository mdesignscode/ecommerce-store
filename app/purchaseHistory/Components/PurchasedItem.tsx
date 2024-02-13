import { motion } from "framer-motion";
import { IPurchasedItem } from "@/app/actions/getPurchaseHistory";
import { getDiscountPrice } from "@/utils";
import Image from "next/image";

export default function PurchasedItem({ item }: { item: IPurchasedItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
      className="flex gap-4"
    >
      <div className="flex-1 flex items-center relative ">
        <svg aria-hidden="true" height={5} className="w-full">
          <line
            x1="0"
            y1="2.5"
            x2="100%"
            y2="2.5"
            stroke-width="5"
            className="stroke-gray-400"
          />
        </svg>

        <svg
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 -right-1"
          width="20"
          height="20"
        >
          <circle cx="10" cy="10" r="8" className="fill-gray-400" />
        </svg>
      </div>

      <div
        className="flex flex-col gap-2 p-3 w-5/6 ml-auto bg-gray-200 shadow-sm shadow-gray-200 border-2 border-gray-300 rounded-lg"
        aria-label="Purchased item"
      >
        <Image
          className="rounded-lg"
          src={item.product?.images[0].url || ""}
          alt="Product preview"
          width={100}
          height={100}
        />

        <p>{item.product?.title}</p>

        <div className="flex justify-between">
          <p>Quantity</p>
          <p>{item.quantity}</p>
        </div>

        <div className="flex justify-between">
          <p>Price</p>
          <p>${item.product?.price.amount}</p>
        </div>

        {!!item.product?.discountPercentage && (
          <div className="flex justify-between">
            <p>Discounted price</p>
            <p>
              $
              {getDiscountPrice(
                item.product?.price.amount,
                item.product?.discountPercentage
              )}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

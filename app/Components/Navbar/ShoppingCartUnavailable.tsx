import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ShoppingCartUnavailable({
  reason,
}: {
  reason: "no user" | "cart empty";
}) {
  return (
    <div className="flex-1 grid place-items-center">
      <div className="m-auto text-center p-2">
        {reason === "cart empty" ? (
          <>
            <ShoppingCartIcon className="mx-auto w-16 md:w-20" />
            <span className="md:text-lg">Your shopping cart is empty.</span>
          </>
        ) : (
          <>
            <ShoppingBagIcon className="mx-auto w-16 md:w-20" />
            <span className="md:text-lg">
              <Link href="/sign-in" className="text-primary hover:underline">Sign in</Link> to add products to shopping
              cart.
            </span>
          </>
        )}
      </div>
    </div>
  );
}

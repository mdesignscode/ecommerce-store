"use client";

import { TProduct } from "@/components/ProductsGroup";
import useCreateCheckoutSession from "@/hooks/createCheckoutSession";
import { ICheckOutProduct } from "@/models/customRequests";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import CheckoutButton from "./CheckoutButton";
import CheckoutProduct from "./CheckoutProduct";
import CheckoutPageSkeleton from "@/app/Components/Skeletons/CheckoutPage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC || "");

export default function CheckoutPage({ products }: { products: TProduct[] }) {
  const [shouldCreateCheckoutSession, setShouldCreateCheckoutSession] =
      useState(false),
    [checkoutProducts, setCheckoutProducts] = useState<{
      [key: string]: ICheckOutProduct;
    }>(
      Object.fromEntries(
        products.map((product) => [
          product?.id,
          { quantity: 1, price: product?.price.id } as ICheckOutProduct,
        ])
      )
    ),
    { isSuccess, isFetching, clientSecret } = useCreateCheckoutSession({
      shouldCreateSession: shouldCreateCheckoutSession,
      checkOutProducts: Object.values(checkoutProducts),
    });

  const options = { clientSecret };

  return (
    <section className="py-4 md:flex w-full">
      <section className="flex flex-col gap-6 md:w-2/3">
        <section className="flex overflow-x-auto gap-4">
          {products?.map((product) => (
            <CheckoutProduct
              setCheckoutProducts={setCheckoutProducts}
              key={product?.id}
              product={product}
              checkoutProducts={checkoutProducts}
            />
          ))}
        </section>

        <CheckoutButton
          clientSecret={clientSecret}
          checkoutSessionCreated={isSuccess}
          setShouldCreateCheckoutSession={setShouldCreateCheckoutSession}
          creatingCheckoutSession={isFetching}
        />
      </section>

      {clientSecret ? (
        <div id="checkout" className="mx-auto">
          {clientSecret && (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      ) : (
        <div className="hidden text-center m-auto md:grid place-items-center">
          <ShoppingBagIcon width={100} />
          <p>Finalize your shopping cart</p>
        </div>
      )}
    </section>
  );
}

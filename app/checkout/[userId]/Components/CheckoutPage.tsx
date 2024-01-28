"use client";

import { TProduct } from "@/app/Components/ProductsGroup";
import useCreateCheckoutSession from "@/app/hooks/createCheckoutSession";
import { ICheckOutProduct } from "@/models/customRequests";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import CheckoutButton from "./CheckoutButton";
import CheckoutProduct from "./CheckoutProduct";

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
    <section className="flex flex-col md:flex-row md:justify-center items-center w-full p-4 overflow-x-hidden gap-4">
      <section className="flex flex-col gap-4">
        <section className="flex gap-2 overflow-x-auto justify-center w-full">
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

      <div id="checkout">
        {clientSecret && (
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </div>
    </section>
  );
}

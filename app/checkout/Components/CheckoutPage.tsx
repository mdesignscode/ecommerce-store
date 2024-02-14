"use client";

import { createCheckoutSession } from "@/actions/createCheckoutSession";
import useGlobalStore from "@/lib/store";
import { ICheckOutProduct } from "@/models/customRequests";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutButton from "./CheckoutButton";
import CheckoutProduct from "./CheckoutProduct";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC || "");

export interface IClientSecret {
  status: "default" | "loading" | "success" | "error";
  secret: string;
  error?: string;
}

export default function CheckoutPage({ products }: { products: TProduct[] }) {
  const [checkoutProducts, setCheckoutProducts] = useState<{
      [key: string]: ICheckOutProduct;
    }>(
      Object.fromEntries(
        products.map((product) => [
          product?.id,
          { quantity: 1, price: product?.price.id } as ICheckOutProduct,
        ])
      )
    ),
    [clientSecretStatus, setClientSecretStatus] = useState<IClientSecret>({
      status: "default",
      secret: "",
    }),
    { currentUser } = useGlobalStore(),
    [shouldCreateCheckoutSession, setShouldCreateCheckoutSession] =
      useState(false);

  useEffect(() => {
    const getClientSecret = async () => {
      setClientSecretStatus({
        secret: "",
        status: "loading",
      });

      const clientSecret = await createCheckoutSession({
        checkoutProducts: Object.values(checkoutProducts),
        userCheckoutId: currentUser.user?.checkoutId,
      });

      if (typeof clientSecret === "string") {
        setClientSecretStatus({
          secret: clientSecret,
          status: "success",
        });
      } else {
        setClientSecretStatus({
          secret: "",
          status: "error",
          error: clientSecret.error,
        });
      }
    };

    if (shouldCreateCheckoutSession) getClientSecret();
  }, [
    checkoutProducts,
    currentUser.user?.checkoutId,
    shouldCreateCheckoutSession,
  ]);

  const options = { clientSecret: clientSecretStatus.secret };

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
          clientSecretStatus={clientSecretStatus}
          setShouldCreateCheckoutSession={setShouldCreateCheckoutSession}
        />
      </section>

      {clientSecretStatus.secret ? (
        <div id="checkout" className="mx-auto">
          {clientSecretStatus.secret && (
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

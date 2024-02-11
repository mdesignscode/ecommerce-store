"use client";

import WaterfallLoader from "@/components/WaterfallLoader";
import useGlobalStore from "@/lib/store";
import { CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { IReceiptObject } from "../page";
import { useEffect } from "react";
import { getPurchaseHistory } from "@/app/actions/getPurchaseHistory";

export default function ReceiptPage({
  sessionStr,
  receiptObjects,
}: {
  sessionStr: string;
  receiptObjects: IReceiptObject[];
}) {
  const { activeUser, setUserPurchaseHistory } = useGlobalStore(),
    session = JSON.parse(sessionStr);

  useEffect(() => {
    const setPurchaseHistory = async () => setUserPurchaseHistory(await getPurchaseHistory())

    if (activeUser)
      setPurchaseHistory()
  }, [activeUser, setUserPurchaseHistory])

  if (!activeUser) return <WaterfallLoader text="User" />;

  if (session.payment_status === "open") {
    return (
      <div className="text-xl flex flex-col items-start">
        <div className="text-xl flex gap-4 items-center mb-2">
          Payment status:{" "}
          <span className="text-red-600 flex gap-1">
            <XCircleIcon width={20} /> failed
          </span>
        </div>
        <Link
          className="text-red-400 italic"
          href={activeUser?.id ? `/checkout/${activeUser?.id}` : "/sign-in"}
        >
          Try again
        </Link>
        <Link className="underline underline-offset-2 italic" href="/">
          Or browse more products
        </Link>
      </div>
    );
  }

  return (
    <main className="flex flex-col py-4 items-start mb-14 gap-4">
      <div className="text-xl flex gap-4 items-center mx-auto">
        <p>Payment status:</p>
        <span className="text-green-600 flex gap-1">
          <CheckIcon width={20} /> success
        </span>
      </div>

      <section
        className="bg-white border-2 border-dark p-2 md:text-lg md:min-w-80 min-w-60 flex flex-col gap-4"
        id="receipt"
        aria-label="Receipt"
      >
        <section className="flex flex-col gap-2" aria-label="Receipt items">
          {receiptObjects.map((item) => (
            <div
              aria-label="Receipt item"
              key={item.name}
              className="flex flex-col"
            >
              <strong>{item.name}</strong>
              <div>
                <div className="flex justify-between">
                  <p>Quantity</p>
                  <p>{item.quantity}</p>
                </div>

                <div className="flex justify-between">
                  <p>Price per unit</p>
                  <p>${item.unitAmount}</p>
                </div>

                <div className="flex justify-between">
                  <p>Total</p>
                  <p>${item.total}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section aria-label="Total">
          <div className="flex justify-between border-y-2 border-gray-600">
            <p>Subtotal</p>
            <p>${session.amount_subtotal}</p>
          </div>

          <div className="flex justify-between">
            <p>Total</p>
            <strong>${session.amount_total}</strong>
          </div>
        </section>
      </section>
    </main>
  );
}

"use client";

import WaterfallLoader from "@/components/WaterfallLoader";
import useGlobalStore from "@/lib/store";
import { CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ReceiptPage({ sessionStr }: { sessionStr: string }) {
  const { activeUser } = useGlobalStore(),
    session = JSON.parse(sessionStr);

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
    <main className="flex flex-col py-4 items-start mb-14">
      <p>
        <div className="text-xl flex gap-4 items-center mb-2">
          Payment status:{" "}
          <span className="text-green-600 flex gap-1">
            <CheckIcon width={20} /> success
          </span>
        </div>
      </p>
      <p>Total: {session.amount_total}</p>
    </main>
  );
}

"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function CheckoutLink() {
  const { user } = useUser();

  return (
    <Link
      href={user ? `/checkout/${user.id}` : "/sign-in"}
      className="text-xl font-bold"
    >
      Checkout
    </Link>
  );
}

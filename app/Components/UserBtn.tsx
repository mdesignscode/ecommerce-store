"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function UserBtn({ isSignedIn }: { isSignedIn: boolean }) {
  return !isSignedIn ? (
    <span data-testid="sign-in-button" className="flex-1 flex justify-center text-xs font-semibold md:text-sm">
      <Link href="/sign-in" className="flex flex-col items-center">
        <UserCircleIcon className="w-7 md:w-9 stroke-primary" />
        <p>Sign in</p>
      </Link>
    </span>
  ) : (
    <span className="flex-1 flex justify-center">
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
    </span>
  );
}

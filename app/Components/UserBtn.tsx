"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function UserBtn({ isSignedIn }: { isSignedIn: boolean }) {
  return !isSignedIn ? (
    <div className="flex bg-light rounded-full border-2 border-secondary flex-col items-center w-20 h-20 md:w-24 md:h-24 p-2">
      <SignedOut>
        <UserCircleIcon height={50} width={50} />
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </div>
  ) : (
    <span className="border-2 rounded-full border-secondary">
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
    </span>
  );
}

"use client";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function MobileNavbar() {
  return (
    <Disclosure as="nav" className="md:hidden">
      {({ open }) => (
        <>
          <section className="flex flex-col p-2 text-light bg-dark">
            <section className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                Dev Store.
              </Link>
              <Disclosure.Button>
                {open ? (
                  <XMarkIcon className="h-12 w-12" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-12 w-12" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </section>
            {open && (
              <section className="flex flex-col gap-2">
                <SignedIn>
                  {/* Mount the UserButton component */}
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <UserCircleIcon height={25} width={25} />
                  {/* Signed out users get sign in button */}
                  <SignInButton />
                </SignedOut>
              </section>
            )}
          </section>
        </>
      )}
    </Disclosure>
  );
}

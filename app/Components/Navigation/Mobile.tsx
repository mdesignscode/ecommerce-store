"use client";

import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function MobileNavbar() {
  return (
    <Disclosure as="nav" className="md:hidden">
      {({ open }) => (
        <>
          <section className="flex justify-between p-2 items-center text-light bg-dark">
            <Link href="/" className="text-xl font-bold">Dev Store.</Link>

            <Disclosure.Button>
              {open ? (
                <XMarkIcon className="h-12 w-12" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-12 w-12" aria-hidden="true" />
              )}
            </Disclosure.Button>
          </section>
        </>
      )}
    </Disclosure>
  );
}

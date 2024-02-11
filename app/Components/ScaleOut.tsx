"use client";

import { Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

export default function ScaleOut({ show, children }: { show: boolean, children: ReactNode}) {
  return (
    <Transition
      show={show}
      leave="transition-all duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 scale-50"
      as={Fragment}
    >{children}</Transition>
  )
}

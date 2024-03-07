"use client";

import { Dispatch, SetStateAction } from "react";
import ShoppingCart from "./ShoppingCart";
import { Button } from "react-aria-components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";

interface ISidebarProps {
  showSideBar: boolean;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  showSideBar,
  setShowSideBar,
}: ISidebarProps) {
  return (
    <>
      <Transition
        enter="transition-opacity duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={showSideBar}
        className="absolute top-0 left-0 w-screen h-screen bg-dark opacity-85 z-40"
        aria-hidden="true"
      />

      <Transition
        enter="transition-transform duration-300 ease-out"
        enterFrom="translate-x-[-100%]"
        enterTo="translate-x-0"
        leave="transition-transform duration-300 ease-in"
        leaveTo="translate-x-[-100%]"
        leaveFrom="translate-x-0"
        show={showSideBar}
        id="sidebar"
        aria-label="Items in shopping cart"
        aria-labelledby="sidebarButton"
        aria-hidden={!showSideBar}
        className="left-0 top-0 fixed z-50 bg-white flex flex-col h-screen w-72 md:w-96"
      >
        <div className="flex justify-between border-b-2 p-2 bg-secondary border-secondary-dark">
          <strong>Shopping Cart</strong>

          <Button
            aria-label="Hide shopping cart items"
            className="flex gap-2 items-center transition-colors text-white hover:text-secondary-dark"
            onPress={() => setShowSideBar(false)}
          >
            Close
            <XMarkIcon width={20} />
          </Button>
        </div>

        <ShoppingCart />
      </Transition>
    </>
  );
}

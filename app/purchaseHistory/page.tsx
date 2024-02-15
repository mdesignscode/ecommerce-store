"use client";

import useGlobalStore from "@/lib/store";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import EmptyList from "@/Components/EmpyList";
import PurchasedItem from "./Components/PurchasedItem";
import PurchaseHistorySkeleton from "@/Skeletons/PurchaseHistory";

export default function Page() {
  const {
    currentUser: { purchaseHistory, loaded },
  } = useGlobalStore();

  if (!loaded) return <PurchaseHistorySkeleton />;

  if (!purchaseHistory || !Object.keys(purchaseHistory).length)
    return <EmptyList listType="Purchase History" />;

  return (
    <main className="flex flex-col p-2 gap-4" aria-label="Your purchased items">
      <h1 className="font-bold text-lg text-center">Your Purchased Items</h1>

      <section
        className="relative overflow-y-hidden flex flex-col gap-4"
        aria-label="Purchased items"
      >
        <svg
          aria-hidden="true"
          width="5"
          className="absolute h-full left-2 top-1 md:top-2"
        >
          <line
            x1="2.5"
            y1="0"
            x2="2.5"
            y2="100%"
            stroke-width="5"
            className="stroke-gray-400"
          />
        </svg>
        {Object.keys(purchaseHistory).map((date, i) => {
          const [_, month, day, year] = date.split(" ");

          return (
            <Disclosure key={date}>
              {({ open }) => (
                <section
                  className="flex flex-col gap-2"
                  aria-label={`Items purchased on ${date}`}
                >
                  <div className="relative">
                    <svg
                      aria-hidden="true"
                      className="absolute top-1/2 -translate-y-1/2"
                      width="20"
                      height="20"
                    >
                      <circle cx="10" cy="10" r="8" className="fill-gray-400" />
                    </svg>

                    <Disclosure.Button
                      aria-label={
                        open ? "Hide purchased items" : "Show purchased items"
                      }
                      className="text-secondary-dark flex gap-4 italic ml-6 md:text-lg"
                    >
                      <span>
                        Your purchases on {day} {month}, {year}
                      </span>
                      <ChevronDownIcon
                        width={20}
                        className={open ? "rotate-180 transform" : ""}
                      />
                    </Disclosure.Button>
                  </div>

                  {open ? (
                    <Transition
                      as={Fragment}
                      enter="transition-height duration-300 ease-out"
                      enterFrom="h-0"
                      enterTo="h-auto"
                      leave="transition-height duration-300 ease-in"
                      leaveFrom="h-auto"
                      leaveTo="h-0"
                    >
                      <Disclosure.Panel
                        aria-label={`${date}'s items`}
                        className="flex flex-col gap-2 p-2 text-sm md:text-base text-gray-800"
                      >
                        {purchaseHistory[date].map((item) => (
                          <PurchasedItem item={item} key={item.id} />
                        ))}
                      </Disclosure.Panel>
                    </Transition>
                  ) : (
                    <>&nbsp;</>
                  )}
                </section>
              )}
            </Disclosure>
          );
        })}
      </section>
    </main>
  );
}

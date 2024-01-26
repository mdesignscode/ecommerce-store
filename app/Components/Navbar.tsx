"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";
import { Button } from "react-aria-components";
import Loading from "../loading";
import useGlobalStore from "@/lib/store";
import Link from "next/link";

export default function Navbar() {
  const [tooltip, setTooltip] = useState({
      show: false,
      text: "",
      x: 0,
    }),
    { user, isLoaded } = useUser(),
    { activeUser } = useGlobalStore();

  return (
    <div className="w-full fixed z-20 bottom-6 ">
      <nav className="flex shadow-lg border-secondary border-2 shadow-dark text-dark bg-light justify-around items-center rounded-lg w-2/3 h-14 m-auto">
        <div
          style={{ left: tooltip.x - 60 }}
          className={classNames(
            "transition-all absolute bottom-16 bg-secondary-dark text-light p-[12px] rounded-md z-20 duration-300 delay-150 text-sm",
            { "opacity-95": tooltip.show },
            { "opacity-0 hidden": !tooltip.show }
          )}
        >
          <p>{tooltip.text}</p>
        </div>

        <Button
          onHoverStart={(e) =>
            setTooltip({
              show: true,
              text: "View Your Shopping Cart",
              x: e.target.offsetLeft,
            })
          }
          onHoverEnd={() => setTooltip({ show: false, text: "", x: 0 })}
        >
          <Link
            href={
              activeUser
                ? `/shoppingCart/${activeUser.shoppingCartId || "empty"}`
                : "/sign-in"
            }
          >
            <ShoppingCartIcon className="fill-primary" width={50} />
          </Link>
        </Button>

        {!isLoaded ? (
          <Loading />
        ) : !user ? (
          <div className="flex bg-light rounded-full border-2 border-secondary flex-col items-center w-20 h-20 p-2">
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
        )}

        <Button
          onHoverStart={(e) =>
            setTooltip({
              show: true,
              text: "View Your Wish List",
              x: e.target.offsetLeft,
            })
          }
          onHoverEnd={() => setTooltip({ show: false, text: "", x: 0 })}
        >
          <Link
            href={
              activeUser
                ? `/wishList/${activeUser.wishListId || "empty"}`
                : "/sign-in"
            }
          >
            <HeartIcon width={50} fill="hotpink" />
          </Link>
        </Button>
      </nav>
    </div>
  );
}

"use client";

import useGlobalStore from "@/lib/store";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { HeartIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Loading from "../loading";

export default function Navbar() {
  const { user, isLoaded } = useUser(),
    { activeUser } = useGlobalStore();

  return (
    <div className="w-full fixed z-20 bottom-6 ">
      <nav className="flex shadow-lg border-secondary border-2 shadow-dark text-dark bg-light justify-around items-center rounded-lg w-2/3 md:w-96 h-14 md:h-20 md:text-secondary-dark m-auto">
        <Link
          href={
            activeUser
              ? `/shoppingCart/${activeUser.shoppingCartId || "empty"}`
              : "/sign-in"
          }
          className="outline-dark flex flex-col items-center"
        >
          <ShoppingCartIcon className="fill-primary" width={50} />
          <p className="hidden md:block">My Cart</p>
        </Link>

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

        <Link
          href={
            activeUser
              ? `/wishList/${activeUser.wishListId || "empty"}`
              : "/sign-in"
          }
          className="text-center flex flex-col items-center"
        >
          <HeartIcon width={50} fill="hotpink" />
          <p className="hidden md:block">My Wish List</p>
        </Link>
      </nav>
    </div>
  );
}

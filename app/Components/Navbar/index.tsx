"use client";

import useGlobalStore from "@/lib/store";
import { useUser } from "@clerk/nextjs";
import {
  BookOpenIcon,
  HeartIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { Button, TooltipTrigger } from "react-aria-components";
import NavbarSkeleton from "../Skeletons/Navbar";
import TooltipWrapper from "../TooltipWrapper";
import Sidebar from "./Sidebar";

const UserBtn = dynamic(() => import("../UserBtn"), { ssr: false });

export default function Navbar() {
  const [showSideBar, setShowSideBar] = useState(false),
    {
      currentUser: { purchaseHistory, shoppingCart, user, wishList, loaded },
    } = useGlobalStore(),
    { isSignedIn, isLoaded } = useUser();

  if (isSignedIn && isLoaded && !loaded) return <NavbarSkeleton />;

  // get objects in history
  let historyCount = 0;
  if (purchaseHistory)
    Object.keys(purchaseHistory).forEach((date) => {
      historyCount += purchaseHistory[date].length;
    });

  return (
    <>
      <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <nav
        id="root-navbar"
        className="flex fixed z-20 left-0 bottom-0 w-full bg-white items-center p-1 border-t-2 border-secondary shadow-lg shadow-dark"
      >
        <Link
          data-testid="checkout-link"
          href="/checkout"
          className="flex-1 text-center focus:outline-dark flex flex-col items-center text-xs font-semibold md:text-sm"
        >
          <Badge
            badgeContent={shoppingCart?.length || 0}
            color="primary"
            className="flex flex-col items-center"
          >
            <ShoppingBagIcon className="fill-pink-600 w-7 md:w-8" />
            <p>Checkout</p>
          </Badge>
        </Link>

        <Link
          data-testid="purchaseHistory-link"
          href="/purchaseHistory"
          className="flex-1 text-center focus:outline-dark flex flex-col items-center text-xs font-semibold md:text-sm"
        >
          <Badge
            badgeContent={historyCount}
            color="primary"
            className="flex flex-col items-center"
          >
            <BookOpenIcon className="fill-primary w-7 md:w-8" />
            <p>History</p>
          </Badge>
        </Link>

        <UserBtn isSignedIn={!!user} />

        <TooltipTrigger>
          <Button
            aria-controls="sidebar"
            aria-label="Show shopping cart items"
            data-testid="sidebar-trigger"
            onPress={() => setShowSideBar(true)}
            className="outline-dark flex-1 text-xs font-semibold md:text-sm"
          >
            <Badge
              badgeContent={shoppingCart?.length || 0}
              color="primary"
              className="flex flex-col items-center"
            >
              <ShoppingCartIcon className="fill-primary w-7 md:w-8" />
              <p>My Cart</p>
            </Badge>
          </Button>
          <TooltipWrapper>Show Shopping Cart</TooltipWrapper>
        </TooltipTrigger>

        <Link
          data-testid="wishList-link"
          href="/wishList"
          className="flex-1 text-center focus:outline-dark flex flex-col items-center text-xs font-semibold md:text-sm"
        >
          <Badge
            badgeContent={wishList?.length || 0}
            color="primary"
            className="flex flex-col items-center"
          >
            <HeartIcon fill="hotpink" className="w-7 md:w-8" />
            <p>Wish List</p>
          </Badge>
        </Link>
      </nav>
    </>
  );
}

"use client";

import useGlobalStore from "@/lib/store";
import {
  BookOpenIcon, HeartIcon,
  ShoppingBagIcon,
  ShoppingCartIcon
} from "@heroicons/react/24/outline";
import { Badge } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { Button, TooltipTrigger } from "react-aria-components";
import TooltipWrapper from "../TooltipWrapper";
import Sidebar from "./Sidebar";

const UserBtn = dynamic(() => import("../UserBtn"), { ssr: false });

export default function Navbar() {
  const [showSideBar, setShowSideBar] = useState(false),
    { activeUser, userWishList, userShoppingCart, userPurchaseHistory } = useGlobalStore();

  // get objects in history
  let historyCount = 0
  if (userPurchaseHistory)
    Object.keys(userPurchaseHistory).forEach(date => {
      historyCount += userPurchaseHistory[date].length
    })

  return (
    <>
      <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <nav
        id="root-navbar"
        className="flex fixed z-20 left-0 bottom-0 w-full bg-white items-center p-1 border-t-2 border-secondary shadow-lg shadow-dark"
      >
        <Link
          href={!!activeUser ? "/checkout" : "/sign-in"}
          className="flex-1 text-center focus:outline-dark flex flex-col items-center text-xs font-semibold md:text-sm"
        >
          <Badge
            badgeContent={userShoppingCart?.length || 0}
            color="primary"
            className="flex flex-col items-center"
          >
            <ShoppingBagIcon className="fill-pink-600 w-7 md:w-8" />
            <p>Checkout</p>
          </Badge>
        </Link>

        <Link
          href={!!activeUser ? "/purchaseHistory" : "/sign-in"}
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

        <UserBtn isSignedIn={!!activeUser} />

        <TooltipTrigger>
          <Button
            onPress={() => setShowSideBar(true)}
            className="outline-dark flex-1 text-xs font-semibold md:text-sm"
          >
            <Badge
              badgeContent={userShoppingCart?.length || 0}
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
          href={!!activeUser ? "/wishList" : "/sign-in"}
          className="flex-1 text-center focus:outline-dark flex flex-col items-center text-xs font-semibold md:text-sm"
        >
          <Badge
            badgeContent={userWishList?.length || 0}
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

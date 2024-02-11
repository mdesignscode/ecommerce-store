"use client";

import useGlobalStore from "@/lib/store";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { Button } from "react-aria-components";
import Sidebar from "./Sidebar";
import { Badge } from "@mui/material";

const UserBtn = dynamic(() => import("../UserBtn"), { ssr: false });

export default function Navbar() {
  const [showSideBar, setShowSideBar] = useState(false),
    { activeUser, userWishList, userShoppingCart } = useGlobalStore();

  return (
    <>
      <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <nav
        id="root-navbar"
        className="flex fixed z-20 left-0 right-0 bottom-6 shadow-lg border-secondary border-2 shadow-dark text-dark bg-light justify-around items-center rounded-lg w-2/3 md:w-96 h-14 md:h-20 md:text-secondary-dark m-auto"
      >
        <Button onPress={() => setShowSideBar(true)} className="outline-dark">
          <Badge
            badgeContent={userWishList?.length || 0}
            color="primary"
            className="flex flex-col items-center"
          >
            <ShoppingCartIcon className="fill-primary" width={50} />
            <p className="hidden md:block">My Cart</p>
          </Badge>
        </Button>

        <UserBtn isSignedIn={!!activeUser} />

        <Link
          href={!!activeUser ? "/wishList" : "/sign-in"}
          className="text-center flex flex-col items-center"
        >
          <Badge
            badgeContent={userShoppingCart?.length || 0}
            color="primary"
            className="flex flex-col items-center"
          >
            <HeartIcon width={50} fill="hotpink" />
            <p className="hidden md:block">My Wish List</p>
          </Badge>
        </Link>
      </nav>
    </>
  );
}

"use client";

import "@/styles/sidebar.css";
import { Drawer } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import ShoppingCart from "./ShoppingCart";

interface ISidebarProps {
  showSideBar: boolean;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  showSideBar,
  setShowSideBar,
}: ISidebarProps) {
  return (
      <Drawer
        anchor="left"
        open={showSideBar}
        onClose={() => setShowSideBar(false)}
      >
        <div className="flex justify-between border-b-2 p-2 bg-secondary border-secondary-dark">
          <strong>Shopping Cart</strong>
        </div>

        <ShoppingCart />
      </Drawer>
  );
}

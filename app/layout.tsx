import { ClerkProvider } from "@clerk/nextjs";
import classNames from "classnames";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Open_Sans } from "next/font/google";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

const SetActiveUser = dynamic(() => import("./Components/SetActiveUser"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description:
    "A dynamic full-stack implementation of an e-commerce app by Marlon Baatjes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={classNames(
            openSans.className,
            "bg-white text-dark h-screen overflow-hidden"
          )}
        >
          <SetActiveUser />
          <div className="flex flex-col h-full">
            <Header />
            <Navbar />
            <div className="flex-1 overflow-y-auto flex flex-col">
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

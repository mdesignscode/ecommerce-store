import { currentUser } from "@clerk/nextjs";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Link from "next/link";

const UserBtn = dynamic(() => import("./UserBtn"), { ssr: false });

export default async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="flex fixed z-20 left-0 right-0 bottom-6 shadow-lg border-secondary border-2 shadow-dark text-dark bg-light justify-around items-center rounded-lg w-2/3 md:w-96 h-14 md:h-20 md:text-secondary-dark m-auto">
      <Link
        href={user ? "/shoppingCart" : "/sign-in"}
        className="outline-dark flex flex-col items-center"
      >
        <ShoppingCartIcon className="fill-primary" width={50} />
        <p className="hidden md:block">My Cart</p>
      </Link>

      <UserBtn isSignedIn={!!user} />

      <Link
        href={user ? "/wishList" : "/sign-in"}
        className="text-center flex flex-col items-center"
      >
        <HeartIcon width={50} fill="hotpink" />
        <p className="hidden md:block">My Wish List</p>
      </Link>
    </nav>
  );
}

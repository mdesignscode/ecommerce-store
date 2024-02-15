import { Skeleton } from "@mui/material";

export default function NavbarSkeleton() {
  const navItem = (
    <div className="flex flex-col gap-1 flex-1 items-center">
      <Skeleton
        variant="rectangular"
        className="rounded-lg"
        width={25}
        height={25}
      />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={40} />
    </div>
  );
  return (
    <div className="flex fixed z-20 left-0 bottom-0 w-full bg-white items-center p-1 border-t-2 border-secondary shadow-lg shadow-dark justify-between">
      {navItem}
      {navItem}
      <span className="relative flex-1 self-end">
        <span className="animate-pulse bg-gray-200 rounded-full absolute w-12 md:w-16 h-12 md:h-16 bottom-4 md:bottom-2 -translate-x-1/2 left-1/2" />
      </span>
      {navItem}
      {navItem}
    </div>
  );
}

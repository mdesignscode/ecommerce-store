import { Skeleton } from "@mui/material";

export default function NavbarSkeleton() {
  return (
    <div className="flex fixed z-20 left-0 right-0 bottom-6 shadow-lg border-secondary border-2 shadow-dark bg-transparent justify-around items-center rounded-lg w-2/3 md:w-96 h-14 md:h-20 md:text-secondary-dark m-auto">
      <Skeleton
        variant="rectangular"
        className="flex fixed z-20 left-0 right-0 bottom-6 shadow-lg border-secondary border-2 shadow-dark text-dark justify-around items-center rounded-lg w-2/3 md:w-96 h-14 md:h-20 md:text-secondary-dark m-auto bg-secondary"
      />

      <Skeleton
        width={50}
        height={50}
        variant="rectangular"
        className="rounded-lg w-full"
      />

      <Skeleton
        variant="rectangular"
        className="rounded-full border-2 border-secondary w-20 h-20 md:w-24 md:h-24 p-2"
      />

      <Skeleton
        width={50}
        height={50}
        variant="rectangular"
        className="rounded-lg w-full"
      />
    </div>
  );
}

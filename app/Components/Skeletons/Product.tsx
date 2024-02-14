import { Skeleton } from "@mui/material";
import AddToUserListSkeleton from "./AddToUserList";

export default function ProductSkeleton({ bgColor }: { bgColor?: string }) {
  return (
    <div
      className={`bg-${bgColor || "light"} flex flex-col flex-none m-2 w-60 md:w-72 rounded-lg p-4 gap-2`}
    >
      <Skeleton width={100} variant="text" sx={{ fontSize: "1.2rem" }} />

      <Skeleton
        variant="rectangular"
        className="rounded-lg w-full"
        height={200}
      />

      <div className="flex gap-4">
        <Skeleton width={50} variant="text" sx={{ fontSize: "1.25rem" }} />

        <Skeleton width={60} variant="text" sx={{ fontSize: "1.25rem" }} />
      </div>

      <AddToUserListSkeleton />
    </div>
  );
}

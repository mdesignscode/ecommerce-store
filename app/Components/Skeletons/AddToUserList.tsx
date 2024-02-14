import { Skeleton } from "@mui/material";

export default function AddToUserListSkeleton() {
  return (
    <div className="flex justify-between">
      <Skeleton
        width={50}
        height={50}
        variant="rectangular"
        className="rounded-lg w-full"
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

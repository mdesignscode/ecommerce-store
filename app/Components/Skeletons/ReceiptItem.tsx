import { Skeleton } from "@mui/material";

export default function ReceiptItemSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton width={140} variant="text" sx={{ fontSize: "1.3rem" }} />

      <div className="flex justify-between">
        <Skeleton width={130} variant="text" sx={{ fontSize: "1.2rem" }} />

        <Skeleton width={20} variant="text" sx={{ fontSize: "1.2rem" }} />
      </div>

      <div className="flex justify-between">
        <Skeleton width={100} variant="text" sx={{ fontSize: "1.2rem" }} />

        <Skeleton width={40} variant="text" sx={{ fontSize: "1.2rem" }} />
      </div>

      <div className="flex justify-between">
        <Skeleton width={80} variant="text" sx={{ fontSize: "1.2rem" }} />

        <Skeleton width={40} variant="text" sx={{ fontSize: "1.2rem" }} />
      </div>
    </div>
  );
}

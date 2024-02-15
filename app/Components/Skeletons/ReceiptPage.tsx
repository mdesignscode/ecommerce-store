import { Skeleton } from "@mui/material";
import ReceiptItemSkeleton from "./ReceiptItem";

export default function ReceiptPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Skeleton
          width={140}
          className="mx-auto"
          variant="text"
          sx={{ fontSize: "1.7rem" }}
        />
        <Skeleton
          width={100}
          className="mx-auto"
          variant="text"
          sx={{ fontSize: "1.7rem" }}
        />
      </div>
      <div className="bg-white border-2 border-dark p-2 md:min-w-80 min-w-60 flex flex-col gap-4">
        <ReceiptItemSkeleton />
        <ReceiptItemSkeleton />

        <div className="flex flex-col">
          <div className="flex justify-between border-y-2 border-dark">
            <Skeleton width={70} variant="text" sx={{ fontSize: "1.2rem" }} />

            <Skeleton width={50} variant="text" sx={{ fontSize: "1.2rem" }} />
          </div>

          <div className="flex justify-between">
            <Skeleton width={40} variant="text" sx={{ fontSize: "1.2rem" }} />

            <Skeleton width={50} variant="text" sx={{ fontSize: "1.2rem" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

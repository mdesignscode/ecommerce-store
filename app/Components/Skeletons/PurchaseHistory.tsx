import { Skeleton } from "@mui/material";

export default function PurchaseHistorySkeleton() {
  const timeline = (
    <div>
      <div className="flex gap-2 items-center">
        <Skeleton width={20} height={20} variant="circular" />
        <Skeleton sx={{ fontSize: "1.1rem" }} width={190} variant="text" />
        <Skeleton width={30} sx={{ fontSize: "1.2rem" }} variant="text" />
      </div>

      <>&nbsp;</>
    </div>
  );

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <Skeleton width={200} variant="text" sx={{ fontSize: "1.5rem" }} />

      <div className="flex flex-col gap-4 w-full relative overflow-y-hidden">
        <Skeleton
          width={8}
          height="100%"
          className="absolute left-[6px] top-2"
          variant="rectangular"
        />
        {timeline}
        {timeline}
        {timeline}
      </div>
    </div>
  );
}

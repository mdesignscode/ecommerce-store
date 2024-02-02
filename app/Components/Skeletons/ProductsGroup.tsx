import { Skeleton } from "@mui/material";
import ProductSkeleton from "./Product";

export default function ProductsGroupSkeleton() {
  return (
    <div className="w-full gap-4 flex flex-col bg-secondary p-4 items-start">
      <Skeleton width={210} variant="text" sx={{ fontSize: "1.5rem" }} />

      <div className="w-full flex overflow-x-auto">
        {Array.from({ length: 5 }).map((i, j) => (
          <ProductSkeleton key={j} />
        ))}
      </div>

      <Skeleton width={300} variant="text" sx={{ fontSize: "1.25rem" }} />
    </div>
  );
}

import { Skeleton } from "@mui/material";
import ProductSkeleton from "./Product";

export default function ProductsGroupSkeleton() {
  return (
    <div className="w-full flex overflow-x-auto">
      {Array.from({ length: 5 }).map((i, j) => (
        <ProductSkeleton key={j} />
      ))}
    </div>
  );
}

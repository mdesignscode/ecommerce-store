import { Skeleton } from "@mui/material";

export default function ProductCategoriesSkeleton() {
  return (
    <div className="overflow-x-auto flex gap-2 p-2 bg-secondary-dark whitespace-nowrap">
      {Array.from({ length: 10 }).map((i, j) => (
        <Skeleton
          key={j}
          variant="rectangular"
          className="rounded-lg"
          height={35}
          width={100}
        />
      ))}
    </div>
  );
}

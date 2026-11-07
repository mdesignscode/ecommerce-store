import ProductSkeleton from "@/Skeletons/Product";
import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <div className="flex flex-col items-center p-4 gap-2">
      <Skeleton width={200} variant="text" sx={{ fontSize: "1.5rem" }} />

      <section className="md:flex md:w-5/6 flex-wrap justify-center items-center">
        {Array.from({ length: 15 }).map((i, j) => (
          <ProductSkeleton bgColor="secondary" key={j} />
        ))}
      </section>
    </div>
  );
}

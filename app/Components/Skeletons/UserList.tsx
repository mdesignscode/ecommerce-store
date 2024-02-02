import ProductSkeleton from "@/app/Components/Skeletons/Product";
import { Skeleton } from "@mui/material";

export default function UserListSkeleton() {
  return (
    <div className="flex flex-col items-center p-4 gap-2">
      <Skeleton width={200} variant="text" sx={{ fontSize: "1.5rem" }} />

      <section className="md:flex md:w-5/6 flex-wrap justify-center items-center gap-2">
        {Array.from({ length: 5 }).map((i, j) => (
          <div className="relative" key={j}>
            <ProductSkeleton bgColor="secondary" />

            <Skeleton
              width={50}
              height={50}
              variant="circular"
              className="absolute -top-2 -right-2"
            />
          </div>
        ))}
      </section>
    </div>
  );
}

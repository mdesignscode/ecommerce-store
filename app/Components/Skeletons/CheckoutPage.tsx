import { Skeleton } from "@mui/material";

export default function CheckoutPageSkeleton() {
  return (
    <div className="p-4">
      <Skeleton width={200} className="mx-auto" variant="text" sx={{ fontSize: "2rem" }} />
      <div className="py-4 md:flex w-full">
        <section className="flex flex-col gap-6 md:w-2/3">
          <section className="flex overflow-x-auto gap-4">
            {Array.from({ length: 2 }).map((i, j) => (
              <div
                className="flex-none rounded-lg gap-2 w-60 flex flex-col p-4 border-2 border-dark"
                key={j}
              >
                <Skeleton
                  variant="rectangular"
                  className="rounded-lg"
                  height={200}
                  width={200}
                />
                <Skeleton
                  width={120}
                  variant="text"
                  sx={{ fontSize: "1.2rem" }}
                  className="mx-auto"
                />
                <Skeleton
                  width={80}
                  variant="text"
                  sx={{ fontSize: "1.2rem" }}
                  className="mx-auto"
                />

                <section className="flex justify-between items-center">
                  <Skeleton
                    variant="circular"
                    className="rounded-lg"
                    height={30}
                    width={30}
                  />

                  <Skeleton
                    width={100}
                    variant="text"
                    sx={{ fontSize: "1.2rem" }}
                  />

                  <Skeleton
                    variant="circular"
                    className="rounded-lg"
                    height={30}
                    width={30}
                  />
                </section>

                <Skeleton
                  variant="rectangular"
                  className="rounded-lg"
                  height={35}
                />
              </div>
            ))}
          </section>

          <Skeleton variant="rectangular" className="rounded-lg" height={60} />
        </section>

        <div className="hidden text-center m-auto md:grid place-items-center">
          <Skeleton
            variant="rectangular"
            className="rounded-lg"
            height={100}
            width={100}
          />
          <Skeleton
            width={120}
            variant="text"
            sx={{ fontSize: "1.2rem" }}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

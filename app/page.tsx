import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";
import Image from "next/image";

const HomePage = dynamic(() => import("./Components/HomePage"));

export default async function Home() {
  const groupedProducts = prisma.product.groupBy({
      by: ["category"],
      orderBy: {
        category: "asc",
      },
    }),
    discountedProducts = prisma.product.findMany({
      include: { images: true, price: true },
      where: {
        discountPercentage: {
          not: null,
        },
      },
      take: 4,
    });

  return (
    <main className="flex flex-col gap-4 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="fixed top-[44px] left-0 -z-10"
      >
        <path
          fill="#ccc5b9"
          fillOpacity="1"
          d="M0,256L48,229.3C96,203,192,149,288,122.7C384,96,480,96,576,112C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      <div className="h-full -mt-[6%]">
        <div className="flex flex-col md:flex-row-reverse relative md:-mb-[8%]">
          <div className="grid place-content-center relative w-full aspect-square md:mx-[6%] md:flex-none md:w-[50%]">
            <Image src="/Ecommerce web page-pana.svg" alt="" fill />
          </div>

          <div className="px-[8%] md:px-[4%] md:my-auto -mt-[16%] text-sm md:text-base md:absolute md:w-[50%] left-0 top-1/2 md:-translate-y-1/2">
            <h1 className="text-lg md:text-xl font-bold">
              Welcome to our online store
            </h1>

            <p>
              Est sit est dignissimos. Aliquam nihil odit et voluptates. Quia id
              et consequatur animi expedita aut voluptas ratione. Mollitia
              doloribus id omnis voluptatem impedit. Numquam quia et a non
              autem. Quos rerum ut rerum exercitationem et.
            </p>
            <p className="hidden lg:block mt-2">
              Qui exercitationem a quisquam. Quibusdam voluptate qui id harum
              nisi inventore vero quo. Temporibus praesentium vel recusandae
              voluptas. Soluta occaecati perspiciatis doloremque nesciunt
              tenetur. Magnam consequatur perferendis dolore quaerat qui
              occaecati neque omnis. Mollitia voluptatem possimus. Numquam est
              minima. Et distinctio eaque consequatur beatae aperiam eaque non
              vero adipisci.
            </p>
          </div>
        </div>

        <HomePage
          groupedProducts={await groupedProducts}
          discountedProducts={await discountedProducts}
        />
      </div>
    </main>
  );
}

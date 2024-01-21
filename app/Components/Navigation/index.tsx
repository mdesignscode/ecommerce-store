import MobileNavbar from "./Mobile";
import ProductCategories from "./ProductCategories";
import prisma from "@/lib/prisma";

export default async function Navbar() {
  const categories = await prisma.product.groupBy({
    by: ["category"],
  });
  return (
    <header className="flex flex-col">
      <MobileNavbar />
      <ProductCategories categories={categories} />
    </header>
  );
}

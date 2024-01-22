"use client";

import { Prisma } from "@prisma/client";
import classNames from "classnames";
import { Button } from "react-aria-components";

type TProductCategories = (Prisma.PickEnumerable<
  Prisma.ProductGroupByOutputType,
  "category"[]
> & {})[];

export default function ProductCategories({
  categories,
}: {
  categories: TProductCategories;
}) {
  return (
    <section
      className={classNames(
        "overflow-x-auto flex gap-2 p-2 bg-secondary-dark whitespace-nowrap"
      )}
    >
      {categories.map(({ category }) => (
        <Button
          className={classNames(
            "bg-secondary rounded-lg text-sm p-2 hover:opacity-80",
            "outline-light hover:outline-dotted"
          )}
          key={category}
        >
          {category}
        </Button>
      ))}
    </section>
  );
}

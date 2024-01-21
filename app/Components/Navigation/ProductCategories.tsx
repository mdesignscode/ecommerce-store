"use client";

import { Prisma } from "@prisma/client";
import classNames from "classnames";
import { Button } from "react-aria-components";
import { focusStyles } from "@TailwindClasses";

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
        focusStyles,
        "overflow-x-auto flex gap-2 p-2 bg-secondary-dark whitespace-nowrap"
      )}
    >
      {categories.map(({ category }) => (
        <Button
          className={classNames(
            "bg-secondary rounded-lg text-sm p-2 hover:opacity-80",
            focusStyles,
            "active:text-light hover:outline-dotted"
          )}
          key={category}
        >
          {category}
        </Button>
      ))}
    </section>
  );
}

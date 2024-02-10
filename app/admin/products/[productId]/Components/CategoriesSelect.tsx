"use client";

import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { EditProductContext } from "./context";
import { useContext } from "react";
import "../styles/select.css"
import { editAttribute } from "./EditAttribute.action";

export default function CategoriesSelect() {
  const { categories, product } = useContext(EditProductContext);

  return (
    <Select
      placeholder={product?.category}
      onSelectionChange={async (c) =>
        await editAttribute(product?.id, {
          key: "category",
          value: c,
        })
      }
    >
      <Button>
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox>
          {categories?.map((c) => (
            <ListBoxItem id={c} key={c}>
              {c}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}

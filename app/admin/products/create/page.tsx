"use client";

import {
  capitalizeAndReplace,
  isNumberAttribute,
  isTextAttribute,
} from "@/utils";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button as MUIButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Group,
  Input,
  Label,
  NumberField,
  Text,
  TextField,
} from "react-aria-components";
import { useFormState } from "react-dom";
import AddImage from "../[productId]/Components/AddImage";
import { findAndCopyFile } from "../[productId]/actions/findAndCopyImage";
import { createProduct } from "./actions/createProduct";
import "./styles/form.css";

export default function Page() {
  // user must provide at least 3 images
  const [imageInputs, setImageInputs] = useState<string[]>(["", "", ""]),
    [lastImageIndex, setLastImageIndex] = useState(0),
    maxAndMinValues = {
      rating: {
        max: 5,
        min: 1,
      },
      stock: {
        max: undefined,
        min: 0,
      },
      price: {
        max: undefined,
        min: 1,
      },
      discountPercentage: {
        min: 0,
        max: 100,
      },
    },
    productAttributes = [
      "rating",
      "discountPercentage",
      "stock",
      "price",
      "title",
      "description",
      "category",
      "images",
    ],
    [status, formAction] = useFormState(createProduct, {
      errors: {  },
    }),
    router = useRouter()

  useEffect(() => {
    if (status?.success)
      router.push(`/admin/products/${status?.success.product.id}`)
  }, [status, formAction, router])

  return (
    <main className="overflow-y-auto bg-white">
      <Form action={formAction} validationErrors={status?.errors}>
        {productAttributes.map((attribute) => {
          if (isTextAttribute(attribute)) {
            return (
              <TextField
                key={attribute}
                name={attribute}
                type="text"
                isRequired
              >
                <Label>{capitalizeAndReplace(attribute)}</Label>
                <Input placeholder={`Enter ${attribute}...`} />
                <FieldError />
              </TextField>
            );
          } else if (isNumberAttribute(attribute)) {
            return (
              <NumberField
                isRequired
                name={attribute}
                key={attribute}
                defaultValue={0}
                maxValue={maxAndMinValues[attribute as TNumberAttributes].max}
                minValue={maxAndMinValues[attribute as TNumberAttributes].min}
              >
                <Label>
                  {attribute === "discountPercentage"
                    ? "Discount Percentage"
                    : capitalizeAndReplace(attribute)}
                </Label>
                <Group>
                  <Button slot="decrement">
                    <MinusIcon width={25} />
                  </Button>
                  <Input />
                  <Button slot="increment">
                    <PlusIcon width={25} />
                  </Button>
                </Group>
                <FieldError />
              </NumberField>
            );
          }
        })}

        <section id="images-section">
          <TextField name="images" className="images-label">
            <Label>Images</Label>
            <Text slot="description">
              Add 3 or more images to show as product preview
            </Text>
            <FieldError />
          </TextField>

          {/* display inputs for the first three images not added */}
          {imageInputs.slice(0, 3).map((input, i) => {
            return input ? undefined : (
              <TextField
                onFocus={() => {
                  const addImageButton = document.getElementById("add-image");

                  addImageButton?.scrollIntoView({ behavior: "smooth" });
                  addImageButton?.focus();
                }}
                key={i}
                isRequired
                name={`image-${i}`}
              >
                <Label>Image {i + 1}</Label>
                <Input placeholder='Add image by clicking "Add Image" button' />
                <FieldError>Please add image</FieldError>
              </TextField>
            );
          })}

          {/* display added images */}
          {imageInputs.filter(Boolean).map((input, i) => (
            <TextField
              name={`image-${i}`}
              defaultValue={input}
              type="hidden"
              key={input}
            >
              <Label>Product image {i + 1}</Label>

              <div className="flex items-center gap-4">
                <Image
                  src={input}
                  width={100}
                  height={100}
                  alt="New product image"
                />

                <MUIButton
                  onClick={() => {
                    setImageInputs((state) => {
                      state[lastImageIndex - 1] = "";
                      return state;
                    });
                    setLastImageIndex((state) => state - 1);
                  }}
                  color="warning"
                  variant="outlined"
                >
                  <TrashIcon width={40} />
                </MUIButton>
              </div>

              <Input />
            </TextField>
          ))}

          <AddImage
            cb={async (filename: string) => {
              const imagePath = await findAndCopyFile(filename);
              setImageInputs((state) => {
                state[lastImageIndex] = "/products/" + imagePath;
                return state;
              });
              setLastImageIndex((state) => state + 1);
            }}
          />
        </section>

        <MUIButton variant="contained" color="primary" type="submit">
          Create new Product
        </MUIButton>
      </Form>
    </main>
  );
}

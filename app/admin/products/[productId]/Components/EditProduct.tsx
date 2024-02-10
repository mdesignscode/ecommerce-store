"use client";

import { capitalizeAndReplace } from "@/utils";
import { useContext } from "react";
import { FieldError, Form, Label, TextField } from "react-aria-components";
import "../styles/form.css";
import AddImage from "./AddImage";
import ImageInput from "./ImageInput";
import InputField from "./InputField";
import NumberInput from "./NumberInput";
import { TTextAttributes } from "./ProductPage";
import { EditProductContext } from "./context";

export default function EditProduct() {
  const { editState, product } = useContext(EditProductContext);

  return (
    <section id="form-container">
      {Object.keys(editState).map((key) => (
        <Form onSubmit={(e) => e.preventDefault()} key={key}>
          {(() => {
            // number input values
            let [label, defaultValue, maxValue, minValue, description] = [
              "",
              0,
              undefined as undefined | number,
              undefined as undefined | number,
              "",
            ];

            // process object key to create input
            switch (key) {
              case "id":
                return;

              // setup number inputs
              case "rating":
                defaultValue = product?.stock || 0;
                label = "rating";
                minValue = 1;
                description = "Enter product rating between 1 and 5";
                maxValue = 5;
                break;

              case "discountPercentage":
                defaultValue = product?.discountPercentage || 0;
                label = "discountPercentage";
                minValue = 0;
                maxValue = 100;
                break;

              case "price":
                defaultValue = product?.price.amount || 0;
                label = "price";
                minValue = 1;
                break;

              case "stock":
                defaultValue = product?.stock || 0;
                label = "stock";
                minValue = 0;
                description = "Enter number of items in stock";
                break;

              // create list of image inputs
              case "images":
                return (
                  <section key="images" className="mb-2">
                    <strong>Images</strong>
                    <div className="flex flex-col mt-2 gap-4">
                      {product?.images.map((image, index) => {
                        return (
                          <ImageInput
                            imageName={`Image ${index + 1}`}
                            isEditing={editState.images[image.url].editing}
                            keyName={image.url}
                            textValue={editState.images[image.url].text}
                            key={image.id}
                            imageId={image.id}
                          />
                        );
                      })}
                    </div>

                    <AddImage />
                  </section>
                );

              // anything else is a normal text input
              default:
                return (
                  <TextField
                    defaultValue={(product as any)[key] || ""}
                    key={key}
                    name={key}
                    type="text"
                  >
                    <Label>{capitalizeAndReplace(key)}</Label>
                    <InputField
                      isEditing={editState[key as TTextAttributes].editing}
                      keyValue={editState[key as TTextAttributes].text}
                      keyName={key}
                    />
                    <FieldError />
                  </TextField>
                );
            }

            // create number input
            return (
              <NumberInput
                key={label}
                {...{
                  label,
                  defaultValue,
                  maxValue,
                  minValue,
                  description,
                }}
              />
            );
          })()}
        </Form>
      ))}
    </section>
  );
}

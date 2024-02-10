"use client";

import SpinningLoader from "@/app/Components/SpinningLoader";
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import { useContext, useRef } from "react";
import { Input } from "react-aria-components";
import CategoriesSelect from "./CategoriesSelect";
import { editAttribute } from "./EditAttribute.action";
import { EditProductContext } from "./context";

interface IInputFieldProps {
  isEditing: boolean;
  keyName: string;
  keyValue: string;
  isImageInput?: boolean;
  deleteImage?: () => Promise<void>;
  deletingImage?: boolean;
}

export default function InputField({
  keyName,
  isEditing,
  keyValue,
  isImageInput,
  deleteImage,
  deletingImage,
}: IInputFieldProps) {
  const { setEditState, activeInput, setActiveInput, product } =
    useContext(EditProductContext);
  const inputRef = useRef(null);

  async function handleFieldEdit() {
    // update the edit state of a attribute
    setEditState((state: any) => ({
      ...state,
      [keyName]: {
        editing: !state[keyName].editing,
        text: !isEditing
          ? state[keyName].text
          : (inputRef.current as any).value,
      },
    }));

    if (inputRef.current && isEditing) {
      await editAttribute(product?.id, {
        key: keyName,
        value: (inputRef.current as any).value,
      });
    }

    if (activeInput === keyName) {
      setActiveInput("");
      return;
    }

    if (activeInput) document.getElementById(activeInput)?.click();
    setActiveInput(keyName);
  }

  return keyName !== "category" ? (
    <span className="flex gap-4 flex-col md:flex-row">
      {isEditing ? (
        // display input for typing
        <Input
          ref={inputRef}
          autoFocus={isEditing}
          placeholder={
            keyName === "discountPercentage"
              ? "Leave empty for no discount"
              : undefined
          }
        />
      ) : (
        // display default text
        <p className="flex-1 bg-white rounded-lg px-4 py-2 border-2 border-transparent">
          {keyValue}
        </p>
      )}

      <section className="flex gap-2">
        {!isImageInput && (
          <Button
            variant="outlined"
            color="secondary"
            id={keyName}
            onClick={handleFieldEdit}
            className="self-center"
            type={isEditing ? "submit" : "button"}
          >
            {isEditing ? <CheckIcon width={25} /> : <PencilIcon width={25} />}
          </Button>
        )}

        {deleteImage && (
          <Button
            onClick={async () => await deleteImage()}
            variant="outlined"
            color="error"
            className="self-center"
          >
            {deletingImage ? <SpinningLoader /> : <TrashIcon width={25} />}
          </Button>
        )}
      </section>
    </span>
  ) : (
    <CategoriesSelect />
  );
}

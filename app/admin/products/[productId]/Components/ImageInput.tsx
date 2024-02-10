"use client";

import useDeleteImage from "@/app/hooks/deleteImage";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useContext, useState } from "react";
import { FieldError, Label, TextField } from "react-aria-components";
import InputField from "./InputField";
import { EditProductContext } from "./context";
import { deleteProductImage } from "../actions/deleteProductImage";

interface IImageInputProps {
  textValue: string;
  imageName: string;
  isEditing: boolean;
  keyName: string;
  imageId: number | undefined;
}

export default function ImageInput({
  keyName,
  textValue,
  imageName,
  isEditing,
  imageId,
}: IImageInputProps) {
  const [imageDeleted, setImageDeleted] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);

  return (
    <Transition
      show={!imageDeleted}
      leave="transition-all duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 scale-50"
      className="flex flex-col md:flex-row gap-4 items-center"
    >
      <Image
        src={keyName}
        alt="Image preview"
        width={100}
        height={100}
        className="h-auto rounded-lg mx-auto self-center"
      />
      <TextField
        className="flex-1 react-aria-TextField"
        defaultValue={textValue}
        name={imageName}
        type="text"
      >
        <Label>{imageName}</Label>

        <InputField
          deleteImage={async () => {
            setDeletingImage(true)
            await deleteProductImage(keyName, imageId);
            setImageDeleted(true);
          }}
          deletingImage={deletingImage}
          isEditing={isEditing}
          keyValue={textValue}
          isImageInput={true}
          keyName={keyName}
        />

        <FieldError />
      </TextField>
    </Transition>
  );
}

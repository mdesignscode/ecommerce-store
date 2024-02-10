"use client";

import SpinningLoader from "@/app/Components/SpinningLoader";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Button, FileTrigger } from "react-aria-components";
import { addProductImage } from "../actions/addProductImage";
import { EditProductContext } from "./context";
import classNames from "classnames";

export default function AddImage({
  cb,
}: {
  cb?: (filename: string) => Promise<void>;
}) {
  const [isFetching, setIsFetching] = useState(false);
  const { product, setEditState } = useContext(EditProductContext);

  const router = useRouter();

  return (
    <>
      <FileTrigger

        acceptedFileTypes={["image/jpeg"]}
        onSelect={async (e) => {
          let files = Array.from(e || []);

          setIsFetching(true)

          if (cb) {
            await cb(files[0].name);
            setIsFetching(false)
            return;
          }

          const productImageName = await addProductImage(
            files[0].name,
            product?.id || ""
          );

          const imagePath = "/products/" + productImageName;

          setEditState((state: any) => ({
            ...state,
            images: {
              ...state.images,
              [imagePath]: {
                text: imagePath,
                editing: false,
              },
            },
          }));
          setIsFetching(false);

          router.refresh();
        }}
      >
        <Button
          id="add-image"
          isDisabled={isFetching}
          className={classNames("flex gap-4 items-center mx-auto my-2 mt-4 px-4 py-2 border-2 border-gray-600 text-gray-600 hover:text-gray-800 focus:outline-gray-800 hover:border-gray-800 transition-all rounded-lg hover:rounded-none focus:rounded-none", { "cursor-not-allowed": isFetching})}
        >
          <span>Add image</span>
          {isFetching ? <SpinningLoader /> : <PlusIcon width={40} />}
        </Button>
      </FileTrigger>
    </>
  );
}

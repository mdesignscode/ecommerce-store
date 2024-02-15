"use client";
import SpinningLoader from "@/app/Components/SpinningLoader";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  OverlayArrow,
  Popover,
} from "react-aria-components";
import "../styles/modal.css";
import "../styles/optionsPopover.css";
import ThreeDotsIcon from "./ThreeDots";

export default function OptionsPopover({
  product,
  isFetching,
  deleteProduct,
}: {
  product: TProduct;
  isFetching: boolean;
  deleteProduct: () => Promise<void>
}) {
  return isFetching ? (
    <SpinningLoader />
  ) : (
    <DialogTrigger>
      <Button>
        <ThreeDotsIcon />
      </Button>

      <Popover>
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>

        <Dialog>
          <div className="flex-col gap-2 flex">
            <Link
              className="flex gap-4"
              href={`/admin/products/${product?.id}`}
            >
              <PencilIcon width={20} />
              Edit
            </Link>

            <DialogTrigger>
              <Button className="flex gap-4 text-red-600">
                <TrashIcon width={20} />
                Delete
              </Button>

              <Modal>
                <Dialog>
                  {({ close }) => (
                    <form className="p-4 flex flex-col gap-4 text-center items-center">
                      <Heading slot="title" className="text-lg md:text-xl">
                        Confirm <strong>{product?.title}</strong> delete
                      </Heading>

                      <Button
                        onPress={async () => {
                          await deleteProduct()
                          close();
                        }}
                        className="border-2 text-red-600 border-red-600 p-2 md;text-lg rounded-lg"
                      >
                        Delete
                      </Button>

                      <Button
                        onPress={close}
                        className="border-2 text-gray-400 border-gray-400 p-2 md:text-lg rounded-lg"
                      >
                        Cancel
                      </Button>
                    </form>
                  )}
                </Dialog>
              </Modal>
            </DialogTrigger>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}

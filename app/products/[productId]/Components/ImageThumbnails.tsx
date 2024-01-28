"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { Button } from "react-aria-components";

type TImage = { id: number; url: string; productId: string | null };

export default function ImageThumbnails({ images }: { images: TImage[] }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className="flex overflow-x-auto">
      {images.map((image, index) => (
        <Button
          onPress={() => setActiveImage(image.url)}
          key={image.id}
          className="m-2"
        >
          <Image
            src={image.url}
            alt={`Thumbnail ${index + 1}`}
            width={150}
            height={150}
            className="rounded-lg transition-all hover:scale-105"
          />
        </Button>
      ))}

      {activeImage && (
        <>
          <div
            className={classNames(
              "h-full w-full top-0 left-0 bg-dark opacity-80 absolute"
            )}
          />
          <div className="z-10">
            <Button className="absolute top-4 left-4" onPress={() => setActiveImage(null)}>
              <XMarkIcon color="#fff" width={50} height={50} />
            </Button>
            <Image
              src={activeImage}
              alt={`Active thumbnail`}
              width={150}
              height={150}
              className="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 rounded-lg w-1/2"
            />
          </div>
        </>
      )}
    </section>
  );
}

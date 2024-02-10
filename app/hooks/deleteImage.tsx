"use client";

import { IDeleteImage } from "@/models/customRequests";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function useDeleteImage({
  imageId,
  imagePath,
}: {
  imageId: number;
  imagePath: string;
}) {
  const [shouldDeleteImage, setshouldDeleteImage] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = baseUrl + "products/images/delete";

  const { isSuccess, isFetching } = useQuery({
    queryKey: ["deleteImage-" + imageId],
    queryFn: async () => {
      try {
        const { data } = await axios.post(url, {
          imageId,
          imagePath
        } as IDeleteImage);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: shouldDeleteImage,
  });

  return {
    setshouldDeleteImage,
    isSuccess,
    isFetching,
  };
}

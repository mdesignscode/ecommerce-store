"use client";

import { IDeleteProduct } from "@/models/customRequests";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { TProduct } from "../Components/ProductsGroup";

interface IDeleteProductProps {
  product: TProduct;
}
export default function useDeleteProduct({ product }: IDeleteProductProps) {
  const [shouldDeleteProduct, setshouldDeleteProduct] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = baseUrl + "products/delete";

  const { isSuccess, isError, isFetching } = useQuery({
    queryKey: ["deleteProduct-" + product?.id],
    queryFn: async () => {
      try {
        const { data } = await axios.post(url, {
          product,
        } as IDeleteProduct);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: shouldDeleteProduct,
  });

  return {
    setshouldDeleteProduct,
    isSuccess,
    isError,
    isFetching,
  };
}

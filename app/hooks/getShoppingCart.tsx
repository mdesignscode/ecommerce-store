"use client";

import { useQuery } from "@tanstack/react-query";
import { TProduct } from "../Components/ProductsGroup";
import axios from "axios";
import { IGetUserList } from "@/models/customRequests";
import useGlobalStore from "@/lib/store";
import { TListType } from "./updateUserList";

export default function useGetShoppingCart() {
  const { activeUser } = useGlobalStore()

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}users/${"shoppingCart" as TListType}/get`;

  const { data, isFetching, isSuccess } = useQuery<TProduct[] | null>({
    queryKey: [
      "getShoppingCart-" + activeUser?.shoppingCartId,
      activeUser?.shoppingCartId,
      activeUser?.shoppingCart?.products
    ],
    queryFn: async () => {
      try {
        const { data } = await axios.post(url, {
          listId: activeUser?.shoppingCartId,
        } as IGetUserList);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!activeUser?.shoppingCartId,
  });

  return { data, isFetching, isSuccess };
}

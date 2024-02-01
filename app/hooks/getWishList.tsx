"use client";

import { useQuery } from "@tanstack/react-query";
import { TProduct } from "../Components/ProductsGroup";
import axios from "axios";
import { IGetUserList } from "@/models/customRequests";
import useGlobalStore from "@/lib/store";
import { TListType } from "./updateUserList";

export default function useGetWishList() {
  const { activeUser } = useGlobalStore();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}users/${"wishList" as TListType}/get`;

  const { data, isFetching, isSuccess } = useQuery<TProduct[] | null>({
    queryKey: [
      "getWishList-" + activeUser?.wishListId,
      activeUser?.wishListId,
    ],
    queryFn: async () => {
      try {
        const { data } = await axios.post(url, {
          listId: activeUser?.wishListId,
        } as IGetUserList);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!activeUser?.wishListId,
  });

  return { data, isFetching, isSuccess };
}

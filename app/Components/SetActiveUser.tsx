"use client";

import useGlobalStore from "@/lib/store";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IGetUser } from "../api/models";
import axios from "axios";

export type TUser = {
  wishList:
    | ({
        products: {
          id: number;
          productId: number;
          shoppingCartId: number | null;
          wishListId: number | null;
          purchaseHistoryId: number | null;
        }[];
      } & {
        id: number;
      })
    | null;

  shoppingCart:
    | ({
        products: {
          id: number;
          productId: number;
          shoppingCartId: number | null;
          wishListId: number | null;
          purchaseHistoryId: number | null;
        }[];
      } & {
        id: number;
      })
    | null;

  purchaseHistory:
    | ({
        products: {
          id: number;
          productId: number;
          shoppingCartId: number | null;
          wishListId: number | null;
          purchaseHistoryId: number | null;
        }[];
      } & {
        id: number;
      })
    | null;
} & {
  id: string;
  name: string;
  shoppingCartId: number | null;
  wishListId: number | null;
  purchaseHistoryId: number | null;
};

export default function SetActiveUser() {
  const { setActiveUser } = useGlobalStore(),
    { user } = useUser();

  // prepare url for updating list
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = baseUrl + "users/get";

  const { isFetched, isSuccess, data } = useQuery<Record<string, number>>({
    queryKey: ["getUser", user?.id],
    queryFn: async () => {
      try {
        const { data } = await axios.post(url, {
          id: user?.id,
        } as IGetUser);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    initialData: {},
    enabled: !!user,
  });

  useEffect(() => {
    if (isFetched && isSuccess) {
      setActiveUser((data as any) as TUser);
    }

  }, [isFetched, isSuccess, data, setActiveUser]);

  return <></>;
}

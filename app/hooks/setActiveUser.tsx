"use client";

import useGlobalStore from "@/lib/store";
import { IGetUser } from "@/models/customRequests";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export type TUser =
  | ({
      wishList:
        | ({
            products: {
              id: number;
              productId: string;
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
              productId: string;
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
              productId: string;
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
      checkoutId: string | null;
    })
  | null;

export default function useSetActiveUser() {
  const { setActiveUser } = useGlobalStore(),
    { user } = useUser();

  // prepare url for updating list
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = baseUrl + "users/get";

  const { isFetched, isSuccess, data } = useQuery<TUser>({
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
    enabled: !!user,
  });

  useEffect(() => {
    if (isFetched && isSuccess) {
      setActiveUser(data);
    }
  }, [isFetched, isSuccess, data, setActiveUser, user]);
}

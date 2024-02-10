"use client";

import useGlobalStore, { TUser } from "@/lib/store";
import { ICreateCheckoutUser } from "@/models/customRequests";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export default function useCreateCheckoutUser(enabled: boolean) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = baseUrl + "checkout/users/create",
    { activeUser, setActiveUser } = useGlobalStore();

  const { isSuccess, data, isFetching } = useQuery<TUser>({
    queryKey: ["createCheckoutUser-" + activeUser?.id, activeUser?.id],
    queryFn: async () => {
      try {
        const { data } = await axios.post(url, {
          email: activeUser?.name,
          userId: activeUser?.id,
        } as ICreateCheckoutUser);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled,
  });

  useEffect(() => {
    if (isSuccess) setActiveUser(data);
  }, [data, isSuccess, setActiveUser]);

  return { isSuccess, isFetching };
}

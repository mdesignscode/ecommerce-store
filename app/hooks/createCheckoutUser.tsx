"use client";

import useGlobalStore from "@/lib/store";
import { ICreateCheckoutUser } from "@/models/customRequests";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { TUser } from "../Components/SetActiveUser";

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

  useEffect(() => {
    console.log("user create:: ", { isSuccess, isFetching, enabled, activeUser });
  }, [isSuccess, isFetching, enabled, activeUser]);
  return { isSuccess, isFetching };
}

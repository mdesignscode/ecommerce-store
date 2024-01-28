"use client";

import useGlobalStore from "@/lib/store";
import {
  ICheckOutProduct,
  ICreateCheckoutSession,
} from "@/models/customRequests";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

interface ICreateCheckoutSessionProps {
  shouldCreateSession: boolean;
  checkOutProducts: ICheckOutProduct[];
}

interface ICreateCheckoutSessionUtils {
  clientSecret: string;
  isSuccess: boolean;
  isFetching: boolean;
}

export default function useCreateCheckoutSession({
  shouldCreateSession,
  checkOutProducts,
}: ICreateCheckoutSessionProps): ICreateCheckoutSessionUtils {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = baseUrl + "checkout/sessions/create",
    { activeUser } = useGlobalStore();

  const { isSuccess, isFetching, data } = useQuery<{
    clientSecret: string;
  }>({
    queryKey: [
      `createCheckoutSession-${activeUser?.checkoutId}`,
      activeUser?.checkoutId,
    ],
    queryFn: async () => {
      try {
        const { data } = await axios.post(url, {
          checkOutProducts,
          userCheckoutId: activeUser?.checkoutId,
          userId: activeUser?.id,
        } as ICreateCheckoutSession);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: shouldCreateSession,
  });

  useEffect(() => {
    console.log("session create:: ", {
      isSuccess,
      isFetching,
      shouldCreateSession,
      activeUser,
    });
  }, [isSuccess, isFetching, shouldCreateSession, activeUser]);

  const utils: ICreateCheckoutSessionUtils = {
    clientSecret: data?.clientSecret || "",
    isSuccess,
    isFetching,
  };
  return utils;
}

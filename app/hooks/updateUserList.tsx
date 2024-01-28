"use client";

import useGlobalStore from "@/lib/store";
import { IUpdateUserList } from "@/models/customRequests";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TProduct } from "../Components/ProductsGroup";
import { TUser } from "../Components/SetActiveUser";

export type TListType = "shoppingCart" | "wishList" | "purchaseHistory";
export type TQueryKey = "addToWishList" | "addToShoppingCart";

interface IUpdateUserListProps {
  listType: TListType;
  product: TProduct;
  queryKey: TQueryKey;
}

interface IUpdateUserListUtils {
  productInUserList: boolean;
  isFetching: boolean;
  setShouldAddToUserList: Dispatch<SetStateAction<boolean>>;
  isSuccess: boolean;
}

export default function useUpdateUserList({
  listType,
  product,
  queryKey,
}: IUpdateUserListProps): IUpdateUserListUtils {
  const [shouldAddToUserList, setShouldAddToUserList] = useState(false),
    { user } = useUser(),
    { activeUser, setActiveUser } = useGlobalStore(),
    [productInUserList, setProductInUserList] = useState(false);

  useEffect(() => {
    if (activeUser) {
      setProductInUserList(
        !!activeUser[listType]?.products?.filter(
          (listItem) => listItem.productId === product?.id
        )[0]
      );
    }
  }, [activeUser, listType, product?.id]);

  // prepare url for updating list
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "users/";
  const url = baseUrl + queryKey;

  // add to user list
  const { isFetched, isSuccess, data, isFetching } = useQuery<TUser>({
    queryKey: [`${queryKey}-${product?.id}`],
    queryFn: async () => {
      if (!activeUser) return;

      try {
        const { data } = await axios.post(url, {
          userId: user?.id,
          product,
          listType,
          listId: activeUser[`${listType}Id`],
        } as IUpdateUserList);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: shouldAddToUserList,
  });

  useEffect(() => {
    if (isFetched && isSuccess) {
      setActiveUser(data);
      setShouldAddToUserList(false);
    }
  }, [data, isFetched, isSuccess, setActiveUser]);

  const updateUtils: IUpdateUserListUtils = {
    productInUserList,
    isFetching,
    setShouldAddToUserList,
    isSuccess,
  };
  return updateUtils;
}

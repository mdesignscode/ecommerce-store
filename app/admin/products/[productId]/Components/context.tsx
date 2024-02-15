"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export interface IEditProductContext {
  setEditState: Dispatch<SetStateAction<TProductEdit>>;
  editState: TProductEdit;
  setActiveInput: Dispatch<SetStateAction<string>>;
  activeInput: string;
  product: TProduct;
  setProduct: Dispatch<SetStateAction<TProduct>>;
  categories: string[] | undefined;
}

export const initialEditProductContext: IEditProductContext = {
  setEditState: () => {},
  editState: {} as TProductEdit,
  setActiveInput: () => {},
  activeInput: "",
  setProduct: () => {},
  product: null,
  categories: undefined,
};

export const EditProductContext = createContext<IEditProductContext>(
  initialEditProductContext
);

export function EditProductProvider({
  children,
  editState,
  setEditState,
  product,
  categories
}: {
  children: React.ReactNode;
  setEditState: Dispatch<any>;
  editState: any;
  product: TProduct;
  categories: string[]
}) {
  const [activeInput, setActiveInput] = useState("");
  const [_, setProduct] = useState(product);

  // store object
  const store: IEditProductContext = {
    setEditState,
    editState,
    setActiveInput,
    activeInput,
    product,
    setProduct,
    categories
  };

  return (
    <EditProductContext.Provider value={store}>
      {children}
    </EditProductContext.Provider>
  );
}

import { TProduct } from '@/app/Components/ProductsGroup';
import { IPurchasedItem } from '@/app/actions/getPurchaseHistory';
import { create } from 'zustand';

export type TUser =
  | ({
    wishList:
    | ({
      products: {
        id: number;
        productId: string;
        shoppingCartId: number | null;
        wishListId: number | null;
      }[];
    } & {
      id: number;
    }) | null;

    shoppingCart:
    | ({
      products: {
        id: number;
        productId: string;
        shoppingCartId: number | null;
        wishListId: number | null;
      }[];
    } & {
      id: number;
    }) | null;

    purchaseHistory:
    | ({
      products: {
        id: number;
        createdAt: Date;
        quantity: number;
        productId: string;
        purchaseHistoryId: number | null;
      }[];
    } & {
      id: number;
    }) | null;
  } & {
    id: string;
    name: string;
    shoppingCartId: number | null;
    wishListId: number | null;
    purchaseHistoryId: number | null;
    checkoutId: string | null;
  })
  | null;

type TUserList = TProduct[] | null

interface StoreState {
  activeUser: TUser | null;
  setActiveUser: (activeUser: TUser) => void;
  userShoppingCart: TUserList
  setUserShoppingCart: (cart: TUserList) => void
  userWishList: TUserList
  setUserWishList: (wishlist: TUserList) => void
  userPurchaseHistory: Record<string, IPurchasedItem[]> | null
  setUserPurchaseHistory: (historylist: Record<string, IPurchasedItem[]> | null) => void
}

const useGlobalStore = create<StoreState>()(
  (set) => ({
    activeUser: null,
    setActiveUser: (activeUser) => set(() => ({ activeUser })),
    userShoppingCart: null,
    setUserShoppingCart: (cart) => set(() => ({ userShoppingCart: cart })),
    userWishList: null,
    setUserWishList: (wishlist) => set(() => ({ userWishList: wishlist })),
    userPurchaseHistory: null,
    setUserPurchaseHistory: (historylist) => set(() => ({ userPurchaseHistory: historylist })),
  }),
)
export default useGlobalStore

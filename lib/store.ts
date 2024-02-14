import { IPurchasedItem } from '@/app/actions/getPurchaseHistory';
import { create } from 'zustand';

type TUserData = {
  user?: TUser;
  shoppingCart?: TUserList;
  wishList?: TUserList;
  purchaseHistory?: Record<string, IPurchasedItem[]> | null
  loaded: boolean;
}

type TUserDataUpdate = Omit<TUserData, "loaded">;

interface StoreState {
  currentUser: TUserData,
  setCurrentUser: (prevData: TUserData, newData: TUserDataUpdate) => void
}

const useGlobalStore = create<StoreState>()(
  (set) => ({
    currentUser: {
      loaded: false
    },
    setCurrentUser: (prevData, newData) => set(() => ({
      currentUser: {
        ...prevData,
        ...newData
      }
    })),
  }),
)

export default useGlobalStore

import { TProduct } from '@/app/Components/ProductsGroup';
import { TUser } from '@/app/hooks/setActiveUser';
import { create } from 'zustand'

interface StoreState {
  activeUser: TUser | null;
  setActiveUser: (activeUser: TUser) => void;
  userShoppingCart: TProduct[] | null;
  setUserShoppingCart: (userShoppingCart: TProduct[] | null) => void
}

const useGlobalStore = create<StoreState>()(
  (set) => ({
    activeUser: null,
    setActiveUser: (activeUser) => set(() => ({ activeUser })),
    userShoppingCart: null,
    setUserShoppingCart: (userShoppingCart) => set(() => ({ userShoppingCart }))
  }),
)
export default useGlobalStore

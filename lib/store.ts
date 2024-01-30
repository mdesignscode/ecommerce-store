import { TUser } from '@/app/hooks/setActiveUser';
import { create } from 'zustand'

interface StoreState {
  activeUser: TUser | null;
  setActiveUser: (activeUser: TUser) => void;
}

const useGlobalStore = create<StoreState>()(
  (set) => ({
    activeUser: null,
    setActiveUser: (activeUser) => set(() => ({ activeUser })),
  }),
)
export default useGlobalStore

import { TUser } from '@/app/Components/SetActiveUser';
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface StoreState {
  activeUser: TUser | null;
  setActiveUser: (activeUser: TUser) => void;
}

const useGlobalStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        activeUser: null,
        setActiveUser: (activeUser) => set(() => ({ activeUser })),
      }),
      {
        name: 'global-storage',
      },
    ),
  ),
)
export default useGlobalStore

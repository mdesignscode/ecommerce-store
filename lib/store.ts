import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface StoreState {
  activeCategory: string | null;
  setActiveCategory: (category?: string) => void;
}

const useGlobalStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        activeCategory: null,
        setActiveCategory: (category) => set(() => ({ activeCategory: category })),
      }),
      {
        name: 'global-storage',
      },
    ),
  ),
)
export default useGlobalStore

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface  infoUser{
  name: string;
  email: string;
  role: number;
}; 
interface CombinedStore {
  token: string | null;
  setToken: (newToken: string | null) => void;
  clearToken: () => void;
  infoUser:infoUser;
  setInfoUser: (newInfoUserData: Partial<infoUser>) => void;
  resetInfoUser: () => void;
}

const useCombinedStore = create<CombinedStore>()(
  persist(
    (set) => ({
      token: localStorage.getItem('combined-store-token') || null,
      setToken: (newToken) => {
        set({ token: newToken });
        localStorage.setItem('combined-store-token', newToken || '');
      },
      clearToken: () => {
        set({ token: null });
        localStorage.removeItem('combined-store-token');
      },
      infoUser: {
        name: '',
        email: '',
        role: 0,
      },
      setInfoUser: (newInfoUserData) =>
        set((state) => ({ infoUser: { ...state.infoUser, ...newInfoUserData } })),
      resetInfoUser: () => set({ infoUser: { name: '', email: '', role: 0 } }),
    }),
    {
      name: 'combined-store',
    }
  )
);

export default useCombinedStore;

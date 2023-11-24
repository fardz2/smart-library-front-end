import { create } from 'zustand'
type AuthStore = {
  token: string | null;
  setToken: (newToken: string | null) => void;
  clearToken: () => void;
} ;
const useAuthStore = create<AuthStore>((set) => ({
  // State variable to store the token
  token: null,
  // Function to set the token
  setToken: (newToken: string | null) => set((state) => ({ token: newToken })),

  // Function to clear the token
  clearToken: () => set({ token: null }),
}));

export default useAuthStore;
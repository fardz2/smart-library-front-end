// import { create } from 'zustand'

// interface infoUser {
//   name: string;
//   email: string;
//   role: number;
// }

// interface infoUserStore {
//   infoUser: infoUser;
//   setinfoUser: (newinfoUserData: Partial<infoUser>) => void;
//   resetinfoUser: () => void;
// }

// const useinfoUserStore = create<infoUserStore>((set) => ({
//   infoUser: {
//     name: '',
//     email: '',
//     role: 0,
//   },
//   setinfoUser: (newinfoUserData) =>
//     set((state) => ({ infoUser: { ...state.infoUser, ...newinfoUserData } })),
//   resetinfoUser: () => set({ infoUser: { name: '', email: '', role: 0 } }),
// }));

// export default useinfoUserStore;

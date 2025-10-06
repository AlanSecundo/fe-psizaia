import { create } from "zustand";

type User = {
  name: string;
  id: string;
  image: string;
};

type UserStore = {
  user: User;
};

const useUser = create<UserStore>((set) => ({
  user: {
    id: "",
    name: "Beatriz Pizaia Sakai Secundo",
    image: "https://s3-sa-east-1.amazonaws.com/doctoralia.com.br/doctor/d0ec5b/d0ec5bb452afa4cec39580349b10d783_large.jpg",
  },
  setUser: (user: User) => set({ user }),
}));

export default useUser;

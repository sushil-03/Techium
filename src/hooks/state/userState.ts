import { create } from "zustand";
export interface UserState {
  first_name: string;
  last_name: string;
  image: string;
  email: string;
  auth_type: string;
  bio: string;
  location: string;
  occupation: string;
  id: string;
  personal_link: string;
}

export interface userStateType {
  user: UserState;
  newsletter_emails: boolean;
  setNewsLetter: (isSubscribe: boolean) => void;
  setUser: (data: UserState) => void;
}
export const useUserStore = create<userStateType>((set) => ({
  user: {
    id: "",
    first_name: "",
    personal_link: "",
    last_name: "",
    image: "",
    email: "",
    location: "",
    occupation: "",
    bio: "",
    auth_type: "",
  },
  newsletter_emails: false,
  setUser: (data: UserState) => set({ user: data }),
  setNewsLetter: (isSubscribe: boolean) =>
    set({ newsletter_emails: isSubscribe }),
}));

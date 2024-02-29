import { create } from "zustand";
export interface FilterStoreType {
  search: string;
  limit: number;
  page: number;
  company: string;
  category: string;
  country: string;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
  setSearchText: (text: string) => void;
  setCompany: (value: string) => void;
  setCategory: (value: string) => void;
  setCountry: (value: string) => void;
}
export const useFilterStore = create<FilterStoreType>((set) => ({
  search: "",
  limit: 5,
  page: 1,
  company: "",
  category: "",
  country: "",
  setSearchText: (text: string) => set({ search: text }),
  setLimit: (value: number) => set({ limit: value }),
  setPage: (value: number) => set({ page: value }),
  setCompany: (value: string) => set({ company: value }),
  setCategory: (value: string) => set({ category: value }),
  setCountry: (value: string) => set({ country: value }),
}));

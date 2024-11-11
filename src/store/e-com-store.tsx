import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getCategory } from "../api/Category";
import { listProduct } from "../api/Product";

interface FormLogin {
  email: string;
  password: string;
}

interface EcomState {
  user: any;
  token: string | null;
  refreshToken: string | null;
  categories: any[];
  products: any[];
  actionLogin: (form: FormLogin) => Promise<any>;
  listCategory: (token: string) => Promise<void>;
  getProduct: (token: string, count: number) => Promise<void>;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

const ecomStore = (set: any) => ({
  user: null,
  token: null,
  refreshToken: null,
  categories: [],
  products: [],
  actionLogin: async (form: FormLogin) => {
    try {
      const res = await axios.post("http://localhost:3000/api/login", form);
      set({
        user: res.data.user,
        token: res.data.token,
        refreshToken: res.data.refreshToken,
      });
      return res;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
  listCategory: async (token: string) => {
    try {
      const res = await getCategory(token);
      set({ categories: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (token: string, count: number) => {
    try {
      const res = await listProduct(token, count);
      set({ products: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  setToken: (token: string) => set({ token }),
  clearAuth: () => set({ token: null, refreshToken: null, user: null }),
});

const useEcomStore = create(
  persist(ecomStore, {
    name: "ecom-store",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useEcomStore;

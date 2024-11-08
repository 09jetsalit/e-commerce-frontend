import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getCategory } from "../api/Category";

interface FormLogin {
  email: string;
  password: string;
}


const ecomStore = (set: any) => ({
  user: null,
  token: null,
  refreshToken: null,
  categories : [],
  actionLogin: async (form: FormLogin) => {
    try {
      const res = await axios.post("http://localhost:3000/api/login", form);
      // console.log(res);
      
      set({
        user: res.data.user,
        token: res.data.token,
        refreshToken: res.data.refreshToken,
      });

      return res
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // rethrow if you want to handle it in the component
    }
  },
  listCategory : async (token: any) => {
    try {
      const res = await getCategory(token);
      // console.log(res);
      set({categories: res.data});
    } catch (error) {
      console.log(error);
    }
  },

});

const useEcomStore = create(
  persist(ecomStore, {
    name: "ecom-store",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useEcomStore;

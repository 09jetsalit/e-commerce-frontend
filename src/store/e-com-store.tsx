import axios from "axios";
import { create } from "zustand";

interface formLogin {
  email: string;
  password: string;
}

const ecomStore = (setState: any) => ({
  name: null,
  value: null,
  actionLogin: async (form: formLogin) => {
    const res = await axios.post("http://localhost:3000/api/login", form);
    return res;
  },
});

const useEcomStore = create(ecomStore);

export default useEcomStore;

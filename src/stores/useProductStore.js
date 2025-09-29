import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
  data: [],
  loading: false,
  error: null,
  
  fetchPosts: async (id) => { 
    set({ loading: true, error: null }); 
    
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      set({ 
        data: res.data,
        
        loading: false 
      });
    } catch (err) {
      console.log(err);
      set({ 
        error: err.message,
        loading: false 
      });
    }
  },
}));
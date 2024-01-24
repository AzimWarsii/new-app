import { create } from "zustand";


const useAvailableStore = create((set) => ({
	ordersAvailable: [],
    setOrdersAvailable: (ordersAvailable) => set({ ordersAvailable }),
	
}));
export default useAvailableStore
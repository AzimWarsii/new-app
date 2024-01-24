import { create } from "zustand";


const useOrderStore = create((set) => ({
	orders: [],
	createOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
	deleteOrder: (id) => set((state) => ({ orders: state.orders.filter((order) => order.id !== id) })),
	setOrders: (orders) => set({ orders }),
	addDelemate: (orderId, deleMateId) =>
		set((state) => ({
			orders: state.orders.map((order) => {
				if (order.id === orderId) {
					return {
						...order,
						assignedTo: deleMateId,
						assignedAt: Date.now()
					};
				}
				return order;
			}),
		})),
	deleteDeleMate: (orderId) =>
		set((state) => ({
			orders: state.orders.map((order) => {
				if (order.id === orderId) {
					return {
						...order,
						assignedTo:"",
						assignedAt:""
					};
				}
				return order;
			}),
		})),
}));

export default useOrderStore;

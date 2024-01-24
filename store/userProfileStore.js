'use client'
import { create } from "zustand";

const useUserProfileStore = create((set) => ({
	userProfile: null,
	setUserProfile: (userProfile) => set({ userProfile }),
	// this is used to update the number of orders in the profile page
	addOrder: (order) =>
		set((state) => ({
			userProfile: { ...state.userProfile, orders: [order.id, ...state.userProfile.orders] },
		})),
	deleteOrder: (orderId) =>
		set((state) => ({
			userProfile: {
				...state.userProfile,
				orders: state.userProfile.orders.filter((id) => id !== orderId),
			},
		})),
}));

export default useUserProfileStore;

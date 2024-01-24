import { useEffect, useState } from "react";
import useOrderStore from "../store/orderStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserOrders = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { orders, setOrders } = useOrderStore();
	const showToast = useShowToast();
	const userProfile = useUserProfileStore((state) => state.userProfile);

	useEffect(() => {
		const getOrders = async () => {
			if (!userProfile) return;
			setIsLoading(true);
			setOrders([]);

			try {
				const q = query(collection(firestore, "orders"), where("createdBy", "==", userProfile.uid));
				const querySnapshot = await getDocs(q);

				const orders = [];
				querySnapshot.forEach((doc) => {
					orders.push({ ...doc.data(), id: doc.id });
				});

				orders.sort((a, b) => b.createdAt - a.createdAt);
				setOrders(orders);
			} catch (error) {
				showToast("Error", error.message, "error");
				setOrders([]);
			} finally {
				setIsLoading(false);
			}
		};

		getOrders();
	}, [setOrders, userProfile, showToast]);

	return { isLoading, orders };
};

export default useGetUserOrders;

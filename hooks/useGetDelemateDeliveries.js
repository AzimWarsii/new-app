import { useEffect, useState } from "react";
import useOrderStore from "../store/orderStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetDelemateDeliveries = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { orders, setOrders } = useOrderStore();
	const showToast = useShowToast();
	const userProfile = useUserProfileStore((state) => state.userProfile);

	useEffect(() => {
		const getDeliveries = async () => {
			if (!userProfile) return;
			setIsLoading(true);
			setOrders([]);

			try {
				const q = query(collection(firestore, "orders"), where("assignedTo", "==", userProfile.uid));
				const querySnapshot = await getDocs(q);

				const deliveries = [];
				querySnapshot.forEach((doc) => {
					deliveries.push({ ...doc.data(), id: doc.id });
				});

				deliveries.sort((a, b) => b.createdAt - a.createdAt);
				setOrders(deliveries);
			} catch (error) {
				showToast("Error", error.message, "error");
				setOrders([]);
			} finally {
				setIsLoading(false);
			}
		};

		getDeliveries();
	}, [setOrders, userProfile, showToast]);

	return { isLoading, orders };
};

export default useGetDelemateDeliveries;

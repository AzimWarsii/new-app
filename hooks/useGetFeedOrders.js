import { useEffect, useState } from "react";
import useOrderStore from "../store/orderStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedOrders = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { orders, setOrders } = useOrderStore();
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const { setUserProfile } = useUserProfileStore();

	useEffect(() => {
		const getFeedOrders = async () => {
			setIsLoading(true);
			const q = query(collection(firestore, "orders"),);
			try {
				const querySnapshot = await getDocs(q);
				const feedOrders = [];

				querySnapshot.forEach((doc) => {
					feedOrders.push({ id: doc.id, ...doc.data() });
				});

				feedOrders.sort((a, b) => b.createdAt - a.createdAt);
				setOrders(feedOrders);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

		if (authUser) getFeedOrders();
	}, [authUser, showToast, setOrders, setUserProfile]);

	return { isLoading, orders };
};

export default useGetFeedOrders;

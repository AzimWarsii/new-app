import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useOrderStore from "../store/orderStore";

const useOrderCancel = () => {
	const [isCancelling, setIsCancelling] = useState(false);
	const showToast = useShowToast();
	const authUser = useAuthStore((state) => state.user);
	const deleteDeleMate = useOrderStore((state) => state.deleteDeleMate);

	const handleOrderCancel = async (orderId , payment) => {
		if (isCancelling) return;
		if (!authUser) return showToast("Error", "You must be logged in to cancel", "error");
		if (payment!="") return showToast("Error", "Paid orders cannot be cancelled", "error");
		setIsCancelling(true);
		
		
		const mateId = authUser.uid;
		try {
			await updateDoc(doc(firestore, "users", mateId), {
				deliveries:arrayRemove(orderId)
			});
			await updateDoc(doc(firestore, "orders", orderId), {
				assignedTo:"",
				assignedAt:"",
				status:"Pending",
				mate:"",
				mateEmail:""
			});
			

			deleteDeleMate(orderId);
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsCancelling(false);
		}
	};

	return { isCancelling, handleOrderCancel};
};

export default useOrderCancel;

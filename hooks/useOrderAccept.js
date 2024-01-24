'use client'
import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc , getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useOrderStore from "../store/orderStore";

const useOrderAccept = () => {
	const [isAccepting, setIsAccepting] = useState(false);
	const showToast = useShowToast();
	const authUser = useAuthStore((state) => state.user);
	const addDelemate = useOrderStore((state) => state.addDelemate);
	

	const handleOrderAccept = async (orderId) => {
		if (isAccepting) return;
		if (!authUser ) return showToast("Error", "You must be logged in to accept", "error");
		setIsAccepting(true);
		
		const mateId = authUser.uid;
		try {
			await updateDoc(doc(firestore, "users", mateId), {
				deliveries:arrayUnion(orderId)
			});
			const userDoc = await getDoc(doc(firestore, "users", mateId));
			const mate = userDoc.data()
			await updateDoc(doc(firestore, "orders", orderId), {
				assignedTo: mateId,
				assignedAt: Date.now(),
				status:"Assigned",
				mate:mate.username,
				mateEmail:mate.email
			});
			

			addDelemate(orderId, authUser.uid);
			showToast("Success", "Order accepted successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsAccepting(false);
		}
	};

	return { isAccepting, handleOrderAccept };
};

export default useOrderAccept;

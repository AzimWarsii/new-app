import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [searchedUsers, setSearchedUsers] = useState([]);
	const showToast = useShowToast();
	const role = 'mate';

	const getUserProfile = async (fromLocation,toLocation) => {
		setIsLoading(true);
		setUser(null);
		try {
			const q = query(collection(firestore, "users"), where("tripFrom", "==", fromLocation),where("tripTo", "==", toLocation),where("role", "==", role));

			const querySnapshot = await getDocs(q);
			if (querySnapshot.empty) return showToast("Error", "No mates found", "error");

			const users =[]

			querySnapshot.forEach((doc) => {
				users.push({...doc.data(), id: doc.id});
			});

			querySnapshot.forEach((doc) => {
				setUser({...doc.data(), id: doc.id});
			});
			setSearchedUsers(users);
		} catch (error) {
			showToast("Error", error.message, "error");
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, getUserProfile, user, setUser, searchedUsers };
};

export default useSearchUser;

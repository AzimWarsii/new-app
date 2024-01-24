import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";


const useGetUserProfileById = (userId) => {
	const [isLoading, setIsLoading] = useState(true);
	//const { userProfile, setUserProfile } = useUserProfileStore();
	const [userProfile, setUserProfile] = useState({})
	const showToast = useShowToast();
	

	useEffect(() => {
		const getUserProfile = async () => {
			if (!userId ) return //showToast("Error", "You must be logged in ");
			setIsLoading(true);
			setUserProfile(null);
			try {
				const userRef = await getDoc(doc(firestore, "users", userId));
				if (userRef.exists()) {
					setUserProfile(userRef.data());
				}
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};
		getUserProfile();
	}, [showToast, setUserProfile, userId]);

	return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;

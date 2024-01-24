'use client'
import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";


import { doc, updateDoc, collection, getDocs, query, where } from "firebase/firestore";

import useUserProfileStore from "../store/userProfileStore";


const useEditProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

	const showToast = useShowToast();

	const editProfile = async (inputs, selectedFile) => {
		if (isUpdating || !authUser) return;
		setIsUpdating(true);

		const storageRef = ref(storage, `profilePics/${authUser.uid}`);
		const userDocRef = doc(firestore, "users", authUser.uid);

		let URL = "";
		try {
			if (selectedFile) {
				await uploadString(storageRef, selectedFile, "data_url");
				URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
			}
			

			const q = query(collection(firestore, "users"), where("uid", "==", authUser.uid));
				const querySnapshot = await getDocs(q);
				let userDoc;
				querySnapshot.forEach((doc) => {
					userDoc = doc.data();
				});


			const updatedUser = {
				...userDoc,
				fullName: inputs.fullName || authUser.fullName,
				username: inputs.username || authUser.username,
				bio: inputs.bio || authUser.bio,
				profilePicURL: URL || authUser.profilePicURL,
				role: inputs.role || authUser.role,
				tripFrom : inputs.tripFrom || authUser.tripFrom,
				tripTo : inputs.tripTo || authUser.tripTo,
				tripDate : inputs.tripDate || authUser.tripDate				
			};

			await updateDoc(userDocRef, updatedUser);
			localStorage.setItem("user-info", JSON.stringify(updatedUser));
			setAuthUser(updatedUser);
			setUserProfile(updatedUser);
			showToast("Success", "Profile updated successfully", "success");
			
		} catch (error) {
			showToast("Error", error.message, "error");
		}
		finally{
			
			
		}
	};

	return { editProfile, isUpdating };
};

export default useEditProfile;

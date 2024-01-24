'use client'
import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { doc, updateDoc, getDoc,setDoc,serverTimestamp} from "firebase/firestore";
import useChatStore from "../store/chatStore";
import useUserProfileStore from "../store/userProfileStore";


const useCreateChat = () => {
	const [isUpdating, setIsUpdating] = useState(false);
	const createChat = useChatStore((state) => state.createChat);
	const authUser = useAuthStore((state) => state.user);
	const userProfile = useUserProfileStore((state) => state.userProfile);


	const showToast = useShowToast();

	const handleCreateChat = async (creatorProfile) => {

        const currentUser =authUser;

        if (isUpdating || !authUser) return;
		setIsUpdating(true);

		//check whether the group(chats in firestore) exists, if not create
		const combinedId = await
		  creatorProfile?.uid > currentUser?.uid
			? creatorProfile?.uid + currentUser?.uid
			: currentUser?.uid + creatorProfile?.uid;
		try {
		  const res = await getDoc(doc(firestore, "chats", combinedId));
	
		  if (!res.exists()) {
			//create a chat in chats collection
			await setDoc(doc(firestore, "chats", combinedId), { messages: [] });
	
			//create user chats
			await updateDoc(doc(firestore, "userChats", creatorProfile.uid), {
			  [combinedId] : {
                userInfo:{
                    uid: currentUser.uid,
				    displayName: currentUser.username,
				    profilePicURL: currentUser.profilePicURL,
                },
				date: serverTimestamp(),
			  },
			  
			});
	
			await updateDoc(doc(firestore, "userChats", currentUser.uid), {
			  [combinedId]: {
                userInfo:{
                    uid: creatorProfile.uid,
				    displayName: creatorProfile.username,
				    profilePicURL: creatorProfile.profilePicURL,
                    
                },
				date: serverTimestamp(),
			  },
			  
			});
		  }

		  if (userProfile?.uid === authUser?.uid) createChat({ ...combinedId, id: postDocRef.id });
		  
		} catch (err) {
            showToast("Error", err.message, "error");
        }
        finally{
            setIsUpdating(false)
        }
	
	  };

	return { handleCreateChat, isUpdating };
};

export default useCreateChat;

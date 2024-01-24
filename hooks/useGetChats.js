'use client'
import { getDoc,doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { useEffect, useState } from "react";
import useChatStore from "../store/chatStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";


const useGetChats = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { chats, setChats } = useChatStore();
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    const { setUserProfile } = useUserProfileStore();


    useEffect(() => {
      const getChats = async () => {
        setIsLoading(true);
       
        try {
          const unsub = onSnapshot(doc(firestore, "userChats", authUser.uid), (doc) => {
            setChats(doc.data());})
          await getDoc(doc(firestore, "userChats", authUser.uid));
          unsub()
        } catch (error) {
          showToast("Error", error.message, "error");
        } finally {
          
          setIsLoading(false);
        }
      };
  
      if (authUser) getChats();
    }, [authUser, showToast, setChats, setUserProfile]);
  
    return { isLoading, chats };
  };
  
  export default useGetChats;